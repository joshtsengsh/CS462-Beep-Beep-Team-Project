/**
 * Purely code logic for db interaction only 
 */
// get list of events 
let localApi = "http://localhost:5001/beepbeep-45b71/us-central1/"; 
let prodApi = "https://us-central1-beepbeep-45b71.cloudfunctions.net/"; 


var events = [];
db.collection("events")
  .onSnapshot((snapshot) => {
    console.log(snapshot);
    snapshot.forEach((doc) => {
      events.push(doc.data());
    })
    console.log(events)
});


const updateParticipants = (data) => {
  let participantID = data.participantID; 
  let attendanceRound = data.attendanceRound;
  let eventID = data.evenID; 
  let temp = data.temp; 


}


/**
 * Send valid data to db 
 * Input: formData json
 * Upon success, modal popup, download pdf of barcodes and names  
 */
const createEvent = (data) => {
  //if fail, fail message 
  
  let createEventSuccess = false; 
  db.collection("events").add({
    duration: parseInt(data.duration, 10),
    eventName: data.eventName,
    startDateTime: data.dateTime,
    attendees: data.names
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