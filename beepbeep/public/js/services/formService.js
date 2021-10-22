/**
 * CRUD to DB, 
 */

//Initialize Firebase
var config = {
  apiKey: "AIzaSyBNQ2ZRxFYd7I42vZZRhFPfqwa4tpKr3ZI",
  authDomain: "beepbeep-45b71.firebaseapp.com",
  databaseURL: "https://beepbeep-45b71-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beepbeep-45b71",
  storageBucket: "beepbeep-45b71.appspot.com",
  messagingSenderId: "640515235677",
  appId: "1:640515235677:web:bce41eb1784d6259b692b4"
};
firebase.initializeApp(config);

var db = firebase.firestore();

/**
 * Send valid data to db 
 * Input: formData json
 * Upon success, modal popup, download pdf of barcodes and names  
 */
createEvent = (data) => {
//if fail, fail message 

let createEventSuccess = false; 
db.collection("events").add({
  attendees: data.names,
  duration: parseInt(data.duration, 10),
  eventName: data.eventName,
  startDateTime: data.dateTime
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
  createEventSuccess = true; 
  //Upon success --> generate pdf to download + barcodes + names 
  activatePopup(data, createEventSuccess);
})
.catch((error) => {
  console.error("Error adding document: ", error);
  createEventSuccess = false; 
  //Upon failure --> fail message 
  activatePopup(data, createEventSuccess);
})

}


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
  
  arrayNames.forEach(element => {
    //spaces as seperator for now 
    element['ID'] = eventName_ + '-' + element.name
  });

  return arrayNames;
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





