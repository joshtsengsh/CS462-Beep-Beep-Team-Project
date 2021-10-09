// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Initialize Cloud Firestore through Firebase
// import { initializeApp } from "firebase/app"
// import { getFirestore } from "firebase/firestore"



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBNQ2ZRxFYd7I42vZZRhFPfqwa4tpKr3ZI",
    authDomain: "beepbeep-45b71.firebaseapp.com",
    databaseURL: "https://beepbeep-45b71-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "beepbeep-45b71",
    storageBucket: "beepbeep-45b71.appspot.com",
    messagingSenderId: "640515235677",
    appId: "1:640515235677:web:bce41eb1784d6259b692b4"
});

// const db = getFirestore(); 

// async function addNewEvent() {
//     const newEvent = await addDoc(collection(db, "events"), {
//         attendees: ["Test 1", "Test 2", "Test 3"],
//         duration: 60,
//         eventName: "Testing a new Event",
//         startDateTime: Timestamp.fromDate(new Date("October 7, 2021")),
//     });
// }

console.log("Hello World!");
// addNewEvent();
console.log("Data added")
