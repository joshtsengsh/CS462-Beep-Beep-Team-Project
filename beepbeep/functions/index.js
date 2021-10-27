
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const cors = require('cors');
const express = require('express');
const app = express();

admin.initializeApp();

const firestore = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: "*" }));

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
app.post('/', (req, res) => res.send(Widgets.create()));
app.get('/', (req, res) => res.send(Widgets.getAllEvents()));
app.patch('/', (req, res) => res.send(Widgets.updateParticipant()));

let eventsCollection = firestore.collection("events"); 

// Adds new event
exports.addEvent = functions.https.onRequest( (req, res) => {
    //console.log(req.query);
    const eventName = req.body.eventName;
    const startDateTime = req.body.startDateTime;
    const duration = req.body.duration;
    const attendees = req.body.attendees;
    
    //console.log(typeof attendees);
    // attendeesList = [];
    
    // Put attendees in associative array (JS object)
    // for (id in attendees) {
    //     var attendeeEntry = {
    //         attendeeId: id,
    //         attendeeName: attendees[id],
    //         round1Attendance: false,
    //         round2Attendance: false,
    //         round1Temperature: null,
    //         round2Temperature: null,
    //     };
    //     attendeesList.push(attendeeEntry);
    // }
    
    // console.log(attendeesList);
    
    // Push the new entry into Firestore using the Firebase Admin SDK
    res.set('Access-Control-Allow-Origin', '*');
    const writeResult = admin.firestore().collection("events").add({
      eventName: eventName,
      startDateTime: startDateTime,
      duration: duration,
      attendees: attendees,
    });
    
    console.log("Uploading...");
    
    // Send back a message that we've successfully written to db
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Get all events
exports.getAllEvents = functions.https.onRequest( (req, res) => {
    let output = [];
    
    firestore.collection("events").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        row = {
            eventId: doc.id,
            eventData: doc.data(),
            //doc.id, " => ", doc.data();
        }
        console.log(row);
        output.push(row);
    });
    console.log("Sending to client...");
    res.json(output);
    });
});


exports.updateParticipant = functions.https.onRequest((req, res) => {

    let eventId = req.body.eventId;
    let participantId = req.body.participantId;
    let temp = req.body.temp;
    let attendanceRound = req.body.attendanceRound;

    // where('eventData.attendees', '==', participantId)
    firestore.collection("events").where('__name__', '==' ,eventId).get().then((querySnapshot) => {
        //shld have one 
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            let eventData = doc.data()

            let participantData = eventData.attendees[participantId]

            if (attendanceRound == 1) {
                participantData.round1Temperature = temp
                participantData.round1Attendance = true 
            }
    
            if (attendanceRound == 2){
                participantData.round2Temperature = temp
                participantData.round2Attendance = true 
            }
            eventData.attendees[participantId] = participantData; 

            doc.ref.update({attendees : eventData.attendees})
        });
        console.log("Sending to client...");
        // once get the single --> find the id ! 
        //update it ! 
        res.json('updated');
    });
})



