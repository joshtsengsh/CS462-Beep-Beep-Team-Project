/**
 * Purely code logic for db interaction only 
 */
// get list of events 

/**
 * Change all api routes to prodApi when deployment, localApi when local dev
 */
let localApi = "http://localhost:5001/beepbeep-45b71/asia-southeast1/"; 
let prodApi = "https://asia-southeast1-beepbeep-45b71.cloudfunctions.net/"; 

let getAllEvents = "getAllEvents"; 
let addEvent = "addEvent";
let recordParticipant = "recordParticipant";
let getById = "getById"

var events = [] 
fetch(prodApi + getAllEvents, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
})
.then(res=>res.json())
  .then(res => {
    // console.log(res);

    events = res;
    
  })
  .catch(e => console.log(e));


const getEventById = (id) => {
  return fetch(prodApi + getById + '?id=' + id , {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(res=>res.json())
    .then(res => {

      return res; 
  
    })
    .catch(e => console.log(e));
}
// fetch(test)
//   .then(response => response.json())
//   .then(data => console.log(data));


// fetchAsync(test)

// var events = [];
// db.collection("events")
//   .onSnapshot((snapshot) => {
//     console.log(snapshot);
//     snapshot.forEach((doc) => {
//       events.push(doc.data());
//     })
//     console.log(events)
// });

const editParticipant = (data) => {
  console.log(data);
}

const recordingParticipants = (data) => {
  let output = {
    participantID : data.participantID, 
    attendanceRound : data.attendanceRound, 
    eventID : data.evenID, 
    temp : data.temp
  }

  (async () => {
    const rawResponse = await fetch(prodApi + recordParticipant, {
      method: 'PATCH',
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(output)
    });
    const content = await rawResponse.json();

    console.log(content);
  })();

}


/**
 * Send valid data to db 
 * Input: formData json
 * Upon success, modal popup, download pdf of barcodes and names  
 */
const createEvent = (data) => {
  let output = {
      duration: parseInt(data.duration, 10),
      eventName: data.eventName,
      startDateTime: data.dateTime,
      attendees: data.names
    }
    console.log(output);
    
    console.log(JSON.stringify(output));


    (async () => {
      const rawResponse = await fetch(prodApi + addEvent, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(output)
      });
      const content = await rawResponse.json();

      createEventSuccess = true; 
      activatePopup(data, createEventSuccess);
    
      console.log(content);
    })();

    
  //if fail, fail message 
  
  // let createEventSuccess = false; 
  // db.collection("events").add({
  //   duration: parseInt(data.duration, 10),
  //   eventName: data.eventName,
  //   startDateTime: data.dateTime,
  //   attendees: data.names
  // })
  // .then((docRef) => {
  //   console.log("Document written with ID: ", docRef.id);
  //   createEventSuccess = true; 
  //   //Upon success --> generate pdf to download + barcodes + names 
  //   activatePopup(data, createEventSuccess);
  // })
  // .catch((error) => {
  //   console.error("Error adding document: ", error);
  //   createEventSuccess = false; 
  //   //Upon failure --> fail message 
  //   activatePopup(data, createEventSuccess);
  // })
}