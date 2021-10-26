// get list of events 
var events = [];
db.collection("events")
  .onSnapshot((snapshot) => {
    console.log(snapshot);
    snapshot.forEach((doc) => {
      events.push(doc.data());
    })
    console.log(events)
});
