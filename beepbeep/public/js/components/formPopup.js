// for debug purpose
// $('#exampleModal').modal('toggle')

//manual open 'add event popup' 
$('#addEvent').on('click', function() {
  $('#exampleModal').modal('show')
})

//manual close 'add event popup'
$('#close-event').on('click', function() {
  $('#exampleModal').modal('hide')
})


//date input settings 
// $(document).ready(() => {
//   var date_input=$('input[name="event-date"]'); //our date input has the name "date"
//   var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
//   var options={
//     startDate: new Date(), 
//     format: 'dd-mm-yyyy',
//     container: container,
//     todayHighlight: true,
//     autoclose: true,
//     orientation: "top"
//   };
//   date_input.datepicker(options);
// })


//show file name on file label upon upload
$('input[type="file"]').change(function(e){
  var fileName = e.target.files[0].name;
  // console.log(e.target.files.length);
  $('.custom-file-label').html(fileName);
});

/**
 * Check if all required inputs are in,
 * if all inputs are in, enable button  
 * if not, continuing disable button 
 */
checkInputs = () => {
  var isValid = true;
  $('input').filter('[required]').each(function() {
    if ($(this).val() === '') {
      $('#event-submit').prop('disabled', true)
      isValid = false;
      return false;
    }
  });
  if(isValid) {$('#event-submit').prop('disabled', false)}
  return isValid;
}

/**
 * on every input change 
 */
$('input').filter('[required]').on('change',() => {
  checkInputs(); 
})

// default check when webpage first render 
checkInputs();



// on submit --> to db 
$('#event-form').submit((e) => {
  e.preventDefault();
  // console.log("submitted"); 
  //get fields 

  let eventName = document.getElementById('event-name').value;
  let eventDate = document.getElementById('event-date').value; //yy-mm-dd format
  let startTime = document.getElementById('start-time').value; 
  let duration = document.getElementById('duration').value; 
  let file = document.getElementById('custom-file').files; 

  //event name to be trim of spaces at the end
  eventName = eventName.trim()
  
  //convert date time to store in db
  let dateTime = new Date(`${eventDate}T${startTime}:00`)

  //for debugging 
  console.log('eventDate', dateTime)
  console.log('eventName', eventName);
  console.log('startTime', startTime);
  console.log('duration', duration);
  console.log('file', file);


  let formData = {
    eventName: eventName, 
    dateTime: dateTime,
    duration: duration,
    names: []
  }

    /**
   * Send valid data to db 
   * Input: formData json
   * Upon success, modal popup, download pdf of barcodes and names  
   */
     sendDataToDB = (data) => {
      //if fail, fail message 

      //Upon succes --> generate pdf to download + barcodes + names 
      activatePopup(data);
    }

    createPDF = (barCodeList)=> {
      
      let doc = new jsPDF()
      let currentIndex = 1;
      barCodeList.forEach((image, index) => { 
        doc.addImage(image, 'png', 1, (currentIndex * 50))
        currentIndex += 1;
        //for every 5 image, add new page 
        if (currentIndex === 6){
          doc.addPage('l');
          currentIndex = 1; 
        }

      })
      // doc.text('Hello world!', 10, 10)
      // doc.addImage(barCodeList[0], 'png', 40, 40)
      // doc.addImage(barCodeList[1], 'png', 80, 80)
      doc.save('a4.pdf')      
    }

    //popup upon success to download
    //or 
    //display fail message  
    activatePopup = (data) => {
      // popup success / fail  
      console.log(data);

      let str = `
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
          
            <div class="col-1"></div>
            <div class="col-10 text-center"><h5 class="modal-title" id="exampleModalLongTitle"></h5></div>
            <div class="col-1 ms-3">
              <button type="button" class="close" data-dismiss="modal" id="close-event" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
    
          </div>
          <div class="modal-body text-center" id="barcode">
    
          </div>
        </div>
      </div>
    </div>
    `
    
    //if success 
    document.getElementById('exampleModal').innerHTML = str 
    document.getElementById('exampleModalLongTitle').innerHTML = 'Event Created !'
    document.getElementById('barcode').innerHTML = `
    <button type="submit" id="download-barcodes" class="btn btn-primary ">Download Barcodes</button>`

    $('#download-barcodes').on('click', function() {
      let barcode = [];
      data.names.forEach((d) => (
        barcode.push(textToBase64Barcode(d.ID))
      ))
      //once all process
      if (barcode.length != 0) {
        createPDF(barcode)
      } 
    })

    //if fail 
    // document.getElementById('exampleModalLongTitle').innerHTML = 'Failed to create event!'
    // document.getElementById('barcode').innerHTML = `<h4>Please try again</h4>`


    //closing of modal 
    //after closing, force reload to reset modal to form format 
    // if user click on close  
    $('#close-event').on('click', function() {
      $('#exampleModal').modal('hide')
      window.location.reload();
    })
  
    //if user click outside of modal 
    $('#exampleModal').on('hidden.bs.modal', function (e) {
      $('#exampleModal').modal('hide')
      window.location.reload();
    })

    }

  /**
   * generateID for names 
   * ID combi as of now date+eventName+name (ask team whats the combi for ID)
   * return json array of name + ID 
   * */  
  generateID = (arrayNames) => {
    //replace spaces with - 
    let eventName_ = eventName.replace(/ /g,"-");
    // let dateTime_ = dateTime.toString().replace(/ /g,"-");
    // console.log(dateTime.toDateString());
    // console.log(dateTime.toLocaleTimeString());
    
    arrayNames.forEach(element => {
      //spaces as seperator for now 
      element['ID'] = eventName_ + '-' + element.name
    });

    return arrayNames;
  }


  //file input + send data to db
  if (file.length > 0) {
    const input = file[0];
    // console.log(input.type);

    //if csv 
    if (input.type == 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        // document.write(text);
        let arrayNames = csvToArray(text);
        formData.names = generateID(arrayNames)
        
        sendDataToDB(formData)
      };
      reader.readAsText(input);
    }
    
    //if xlsx 
    if (input.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const reader = new FileReader(); 
      // console.log('test');

      reader.onload = (e) => {
        let data = e.target.result;
        data = new Uint8Array(data);
        let workbook = XLSX.read(data, {type: 'array'});
        // see the result, caution: it works after reader event is done.
        let arrayNames = xlsxToArray(workbook);

        formData.names = generateID(arrayNames)
        sendDataToDB(formData);
    };
    reader.readAsArrayBuffer(input);
    }
  }

});


/**
 * Print barcode to pdf function upon success 
 */
 textToBase64Barcode = (text) => {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {format: "CODE39"});
  return canvas.toDataURL("image/png");
}