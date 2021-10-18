const routeToEvent = (id) => {
  document.title = id; 
  loadEventContent(id)
  window.history.pushState({id}, `${id}`,
                      `/${id}`);
}

function loadEventContent(id) {
  console.log("Loading content for {" + id + "}");
  // Update text "Content loading for {id}..."
  // Here you would do content loading magic...
  // Perhaps run Fetch API to update resources

  // document.querySelector("#events-component").innerHTML
    // = 'Content loading for /' + id + '...';

  //replace events-component with single-event-component 
  document.getElementById('events-component').innerHTML = table;

  //render table 
  renderTable(id)

  //render custom buttons 
  customButtons()

  //if click on back button --> bring them to events page 
  //force route as of now
  $('#back-to-events').on('click', () => {
    window.location.href="events.html";
  })
}