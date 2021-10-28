/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// biz logic, helpful functions

/**
 * text to barcode in base64 png format 
 * Input: text
 * Output: png - base 64 string 
 */
 textToBase64Barcode = (text) => {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {format: "CODE39"});
  return canvas.toDataURL("image/png");
}

/**
 * generateID for names 
 * ID combi as of now eventName+Name 
 * Input: array of names & eventName
 * Output: return Json array of ID and name 
 * */  
 generateID = (arrayNames, eventName) => {
  //replace spaces with - 
  let eventName_ = eventName.replace(/ /g,"-");
  // let dateTime_ = dateTime.toString().replace(/ /g,"-");
  // console.log(dateTime.toDateString());
  // console.log(dateTime.toLocaleTimeString());

  let outputAttendeesObj = {} 
  arrayNames.forEach(element => {
    //spaces as seperator for now 
    // element['ID'] = eventName_ + '-' + element.name
    let id = eventName_ + '-' + element.name; 

    outputAttendeesObj[id] = {
          attendeeName: element.name, 
          round1Attendance: false,
          round2Attendance: false,
          round1Temperature: 0,
          round2Temperature: 0,
      }
  });

  return outputAttendeesObj;
}


/**
 * create pdf based on barCodeList 
 * Input: 
 * Output: Download PDF 
 */
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

/**
 * Void method: Takes in file and formData , once done create event to db 
 * Input: either csv / xlsx 
 * 
 */
processDataToDB = (file, formData) => {
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
        formData.names = generateID(arrayNames, formData.eventName)
        
        createEvent(formData);
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

        formData.names = generateID(arrayNames, formData.eventName)

        createEvent(formData);
    };
    reader.readAsArrayBuffer(input);
    }
  }
}

readCsv = () => {

}


const downloadBarcodes = (data) => {
  let barcode = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      barcode.push(textToBase64Barcode(key))
    }
  }
  // data.names.forEach((d) => (
  //   barcode.push(textToBase64Barcode(d.ID))
  // ))
  //once all process, create barcode pdf and download
  if (barcode.length != 0) {
    createPDF(barcode)
  } 
}


