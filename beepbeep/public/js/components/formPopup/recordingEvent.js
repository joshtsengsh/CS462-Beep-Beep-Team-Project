/**
 * Listen startRecording class
 */
 recordingPopup = () => {
  console.log("Recording");
  
  openRecordingPopup(); 
}

openRecordingPopup = () => {
  $('#recordingModal').modal('show');
}


function loadEventPageContent(id) {
  console.log("Loading content for {" + id + "}");
  // Update text "Content loading for {id}..."

  //replace events-component with single-event-component 
  document.getElementById('events-component').innerHTML = table;


  document.title = events[id].eventName;

  let data = events[id].attendees; 

  //render table 
  renderTable(data)

  //render custom buttons 
  customButtons(); 

  //if click on back button --> bring them to events page 
  //force route as of now
  $('#back-to-events').on('click', () => {
    // window.location.href="events";
    routeToEventsPage();
  })
}
