// for debug purpose
// $('#createEventModal').modal('toggle')

//manual open 'add event popup' 

const createEventLoaded = () => {
  $('#addEvent').on('click', function() {
  
    console.log('testing');
    
    $('#createEventModal').modal('show')
  })



//manual close 'add event popup'
$('#close-event').on('click', function() {
  $('#createEventModal').modal('hide')
})

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

// default run checkInputs() when webpage first render 
checkInputs();

/**
 * on every input changes, run checkInputs(); 
 */
$('input').filter('[required]').on('change',() => {
  checkInputs(); 
})


// on submit
$('#event-form').submit((e) => {
  e.preventDefault();
  // console.log("submitted"); 

  //get fields values
  //event name to be trim of spaces at the end
  let eventName = document.getElementById('event-name').value.trim();
  let eventDate = document.getElementById('event-date').value; //yy-mm-dd format
  let startTime = document.getElementById('start-time').value; 
  let duration = document.getElementById('duration').value; 
  let file = document.getElementById('custom-file').files; 

  //convert date time to store in db
  let dateTime = new Date(`${eventDate}T${startTime}:00`)

  //for debugging 
  console.log('eventDate', dateTime)
  console.log('eventName', eventName);
  console.log('startTime', startTime);
  console.log('duration', parseInt(duration));
  console.log('file', file);

  let formData = {
    eventName: eventName, 
    dateTime: dateTime,
    duration: parseInt(duration),
    names: []
  }

  processDataToDB(file, formData);
});


/**
 * Void method 
 * popup upon success --> download barcode or  
 * popup upon error / failure --> display fail message
 * Input : FormData and createEventSucess boolean (true / false)
 */
activatePopup = (data, createEventSuccess) => {
  // for debugging 
  console.log(data);

  let str = `
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
      
        <div class="col-1"></div>
        <div class="col-10 text-center"><h5 class="modal-title" id="createEventModalLongTitle"></h5></div>
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

document.getElementById('createEventModal').innerHTML = str 

//if success
if (createEventSuccess) {
  document.getElementById('createEventModalLongTitle').innerHTML = 'Event Created !'
  document.getElementById('barcode').innerHTML = `
  <button type="submit" id="download-barcodes" class="btn btn-primary ">Download Barcodes</button>`
  
  $('#download-barcodes').on('click', function() {
    downloadBarcodes(data)
  })
  } else {
  //if fail 
  document.getElementById('createEventModalLongTitle').innerHTML = 'Failed to create event!'
  document.getElementById('barcode').innerHTML = `<h4>Please try again</h4>`
}

//closing of modal 
//after closing, force reload to reset modal to form format 
// if user click on close  
$('#close-event').on('click', function() {
  $('#createEventModal').modal('hide')
  // window.location.reload();
  routeToEventsPage();
})

//if user click outside of modal 
$('#createEventModal').on('hidden.bs.modal', function (e) {
  $('#createEventModal').modal('hide')
  // window.location.reload();
  routeToEventsPage();
})
}


} 

