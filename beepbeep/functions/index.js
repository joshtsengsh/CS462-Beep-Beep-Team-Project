
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const cors = require('cors');
const express = require('express');
const app = express();

//const serviceAccount = require("./beepbeep-key.json");

admin.initializeApp();

const firestore = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: "*" }));

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
app.post('/', (req, res) => res.send(Widgets.create()));

// Adds new event
exports.addEvent = functions.https.onRequest( (req, res) => {
    //console.log(req.query);
    const eventName = req.query.eventName;
    const startDateTime = req.query.startDateTime;
    const duration = req.query.duration;
    const attendees = req.query.attendees;
    
    //console.log(typeof attendees);
    attendeesList = [];
    
    // Put attendees in associative array (JS object)
    for (id in attendees) {
        var attendeeEntry = {
            attendeeId: id,
            attendeeName: attendees[id],
            round1Attendance: false,
            round2Attendance: false,
            round1Temperature: null,
            round2Temperature: null,
        };
        attendeesList.push(attendeeEntry);
    }
    
    console.log(attendeesList);
    
    // Push the new entry into Firestore using the Firebase Admin SDK
    res.set('Access-Control-Allow-Origin', '*');
    const writeResult = admin.firestore().collection("events").add({
      eventName: eventName,
      startDateTime: startDateTime,
      duration: duration,
      attendees: attendeesList,
    });
    
    console.log("Uploading...");
    
    // Send back a message that we've successfully written to db
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Get all events
exports.getAllEvents = functions.https.onRequest( (req, res) => {
    output = [];
    
    firestore.collection("events").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        row = {
            eventId: doc.id,
            eventData: doc.data(),
            //doc.id, " => ", doc.data();
        }
        //console.log(row);
        output.push(row);
    });
    });
    
    console.log("Sending to client...");
    res.json(output);
});
