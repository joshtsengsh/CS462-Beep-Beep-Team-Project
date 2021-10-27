const loadEventsPageContent = () => {
  let eventCards = `

  <section class="py-5" id="section">
    <div class="container" id="events-component">
      <div id="card-row" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-left">        
        <div class="col mb-5" style="padding-top: 10px;">
          <div class="card h-100">
            <div class="card-header text-center"><b>Add New Event</b></div>
            <div class="card-body p-4" style="transform: rotate(0);">
              <div class="text-center">
                <h5 class="fw-bolder">
                  <!-- data-target="#createEventModal" -->
                  <a class="link-unstyled stretched-link" href="" data-toggle="modal" id="addEvent"
                    class="link-unstyled stretched-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                      class="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path
                        d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                    </svg>
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
  </section>


  <div class="modal fade" id="createEventModal" tabindex="-1" role="dialog" aria-labelledby="createEventModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createEventModalLabel">Create Event</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close-event">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form name="event-form" id="event-form" method="POST">

            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="event-name" class="col-form-label">Event Name:</label>
                  <input type="text" class="form-control" id="event-name" name="event-name" autocomplete="off" required>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <!-- <label for="recipient-name" class="col-form-label">Event Date:</label> -->
                  <div class="form-group">
                    <!-- Date input -->
                    <label class="control-label" for="event-date">Date</label>
                    <!-- <input class="form-control" id="event-date" name="event-date" placeholder="DD-MM-YYYY" type="text" autocomplete="off" /> -->
                    <input class="form-control" id="event-date" name="eventDate" placeholder="DD-MM-YYYY" type="date"
                      autocomplete="off" required />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="start-time" class="col-form-label">Start Time :</label>
                  <!-- min="05:00" max="22:00" -->
                  <input type="time" class="form-control" id="start-time" name="start-time" required>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="duration" class="col-form-label">Event Duration (mins) :</label>
                  <!-- <input type="number" id="duration" name="duration" class="form-control" autocomplete="off" min="0" required>  -->
                  <select class="custom-select" id="duration" name="duration" required>
                    <!-- <option selected>Open this select menu</option> -->
                    <option value="15">15 mins</option>
                    <option value="30">30 mins</option>
                    <option value="45">45 mins</option>
                    <option value="60">60 mins</option>
                    <option value="75">75 mins</option>
                    <option value="90">90 mins</option>
                    <option value="105">105 mins</option>
                    <option value="120">120 mins</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group h-25">
              <p class="my-2">Upload Attendees List :</p>
              <div class="custom-file">
                <label class="custom-file-label col-form-label-lg" for="custom-file" id="custom-file-label">Choose file
                  or drag and drop</span></label>
                <input type="file" class="custom-file-input form-control-lg" id="custom-file" name="custom-file"
                  accept=".csv,.xlsx" required>
              </div>
            </div>

            <div class="form-group text-center">
              <button type="submit" id="event-submit" class="btn btn-primary">Submit</button>
            </div>
            <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
            </div> -->
          </form>
        </div>

      </div>
    </div>
  `
  document.getElementById('container').innerHTML = eventCards;

  renderEventCards();
}


const renderEventCards = () => {
  events.forEach( (event, i) => {
    let dateObj = new Date (event.eventData.startDateTime); 

    let date = dateObj.toLocaleDateString();
  
    let startTime = dateObj.toLocaleString('en-SG', { hour: 'numeric', minute: 'numeric', hour12: true })

      const card = `<div class="col mb-6" style="padding-top: 10px;" id="${i}">
      <div class="card h-100 text-center">
        <div class="card-header ">
        <div class="row">
        <div class= "col"><b>${date}</b></div>
        <div class= "col"><b>${startTime}</b></div>
        </div>
        </div>
        <div class="card-body  card-body p-4 align-items-center d-flex justify-content-center" style="transform: rotate(0);">
            <h5 class="fw-bolder justify-content-center">
              <a href="#" class="link-unstyled stretched-link">
              <p>${event.eventData.eventName}</p>
              </a>
            </h5>
          
        </div>
        <div class="card-footer text-muted">
          Duration: ${event.eventData.duration}min
          </div>
      </div>
    </div>`
      const row = cardContainer = document.getElementById('card-row');
      const ele = document.createElement('div');
      ele.innerHTML = card;
      row.appendChild(ele.firstChild);
  })

  //render event upon click of a event card 
  let cards = document.getElementById('card-row'); 
  
  for (var i = 0, len = cards.children.length; i < len; i++)
  {
      (function(index){
          cards.children[i].onclick = function(){
                // alert(index)  ;
                // console.log(index);
                //get id of the children if have 
                if (cards.children[index].id) {
                  // console.log(cards.children[index].id);
                  routeToEventPage(cards.children[index].id);
                } 
          }    
      })(i);
  }

  createEventLoaded(); 
}











