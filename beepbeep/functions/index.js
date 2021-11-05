
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const cors = require('cors');
const express = require('express');
const app = express();


var allowedOrigins = ['https://beepbeep-45b71.web.app', 'https://beepbeep-45b71.firebaseapp.com', 'http://localhost:5000/', 'null'];

//const db = mongoose.connection;

app.use(cors({
    origin: true
}));

// app.options('*', cors());

admin.initializeApp();

const firestore = admin.firestore();

// // Automatically allow cross-origin requests
// app.use(cors());

// build multiple CRUD interfaces:
app.get('/:id', (req, res) => res.send(Widgets.getById()));
app.post('/', (req, res) => res.send(Widgets.create()));
app.get('/',(req, res) => res.send(Widgets.getAllEvents()));
app.patch('/', (req, res) => res.send(Widgets.recordParticipant()));

app.patch('/', (req, res) => res.send(Widgets.editParticipantByParticipantId()));

exports.editParticipantByParticipantId = functions.region('asia-southeast1').https.onRequest( (req, res) => {
    cors()(req, res, () => {

        let participantId = req.body.participantId; 

        let eventId = req.body.eventId; 

        let body = {
            round1Temperature: req.body.tempOne,
            attendeeName: req.body.name,
            round2Attendance: req.body.attTwo,
            round1Attendance: req.body.attOne,
            round2Temperature: req.body.tempTwo
        }

    // where('eventData.attendees', '==', participantId)
    firestore.collection("events").where('__name__', '==' ,eventId).get().then((querySnapshot) => {
        //shld have one 
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            let eventData = doc.data()

            let participantData = eventData.attendees[participantId]

            participantData = body; 

            eventData.attendees[participantId] = participantData; 

            doc.ref.update({attendees : eventData.attendees})
        });
        // console.log("Sending to client...");
        // once get the single --> find the id ! 
        //update it ! 

            // return res.json({status: 'ok'});
            console.log("Sending to client...");
            return res.json(`${body.attendeeName},  edited `);
        });

    })

});


// e.g http://localhost:5001/beepbeep-45b71/asia-southeast1/getById?id=2sR86wEWtkHmhd4D0ujO
exports.getById = functions.region('asia-southeast1').https.onRequest( (req, res) => {
    cors()(req, res, () => {

        let queriedEventID = req.query.id; 

        firestore.collection("events").where('__name__', '==' ,queriedEventID).get().then((querySnapshot) => {

            let output = {}; 
            querySnapshot.forEach((doc) => {
                
                row = {
                    eventId: doc.id,
                    eventData: doc.data(),
                }
                output = row; 
            });

            return res.json(output);
        }); 
        
    }); 
}); 

// Adds new event
exports.addEvent = functions.region('asia-southeast1').https.onRequest( (req, res) => {
    //console.log(req.query);
    cors()(req, res, () => {
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
    // res.set('Access-Control-Allow-Origin', '*');
    const writeResult = admin.firestore().collection("events").add({
      eventName: eventName,
      startDateTime: startDateTime,
      duration: duration,
      attendees: attendees,
    });
    
    // Send back a message that we've successfully written to db
    // res.json({result: `Message with ID: ${writeResult.id} added.`});

        console.log("Uploading...");
        // return res.json({status: 'ok'});
        // console.log("Sending to client...");
        // return res.json(output);
        return res.json({result: `Message with ID: ${writeResult.id} added.`});
    });
});

// Get all events
exports.getAllEvents = functions.region('asia-southeast1').https.onRequest( (req, res) => {
    let output = [];
    
    firestore.collection("events").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        row = {
            eventId: doc.id,
            eventData: doc.data(),
            //doc.id, " => ", doc.data();
        }
        // console.log(row);
        output.push(row);
    });
    // res.set('Access-Control-Allow-Origin', '*');


    cors()(req, res, () => {
        // return res.json({status: 'ok'});

        console.log("Sending to client...");
        return res.json(output);
    });

    // console.log("Sending to client...");
    // res.json(output);
    });
});


/**
 * For recording of participants
 */
exports.recordParticipant = functions.region('asia-southeast1').https.onRequest((req, res) => {

    cors()(req, res, () => {
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
            // console.log("Sending to client...");
            // once get the single --> find the id ! 
            //update it ! 

            // return res.json({status: 'ok'});
            console.log("Sending to client...");
            return res.json(`${participantId}, round ${attendanceRound} recorded`);
        });
        // res.json('updated');
    });
})


// Expose Express API as a single Cloud Function:
exports.widgets = functions.region('asia-southeast1').https.onRequest(app);
