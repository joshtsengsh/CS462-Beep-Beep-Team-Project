//code for viewing of individual event 
// render the view here 
let table = `
<div> 
  <p id="hiddenEventID">
  </p>
  <div id="single-event-component">
    <button type="button" class="btn btn-primary" id="back-to-events">Back</button>
    <table id="table"
    data-search="true"
    data-buttons="customButtons"
    data-show-export="true"
    data-pagination="true"
    data-page-size="10"
    data-page-list="[10, 25, 50, 100]"
    >
      <thead>
        <tr>
          <th data-field="editButton" rowspan="2" class="editButtons">Edit</th>
          <th data-field="attendeeName" data-sortable="true" rowspan="2">Namelist</th>
          <th colspan="2">Attendance One</th>
          <th colspan="2">Attendance Two</th>
        </tr>
        <tr>
          <th data-field="round1Attendance" data-sortable="true">Arrived ?</th>
          <th data-field="round1Temperature" data-sortable="true">Temp</th>
          <th data-field="round2Attendance" data-sortable="true">Arrived ?</th>
          <th data-field="round2Temperature" data-sortable="true">Temp</th>
        </tr>
      </thead>
    </table>
  </div>

  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <input type="hidden" id="participantID" name="participantID" value="">
        <h5 class="modal-title" id="editModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close-edit" onclick="closeEditPopup()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="edit-participant-name" class="col-form-label">Name :</label>
            <input type="text" class="form-control" id="edit-participant-name">
          </div>

          <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="attOne" class="col-form-label">Attendance 1</label>
                  <select class="custom-select" id="attOne" name="attOne" required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label for="tempOne" class="col-form-label">Temperature 1 (°C) :</label>
                  <input type="text" class="form-control" id="tempOne" name="tempOne" autocomplete="off" required>
                </div>
              </div>
            </div> 


            <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="attTwo" class="col-form-label">Attendance 2 </label>
                <select class="custom-select" id="attTwo" name="attTwo" required>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <label for="tempTwo" class="col-form-label">Temperature 2 (°C) :</label>
                <input type="text" class="form-control" id="tempTwo" name="tempTwo" autocomplete="off" required>
              </div>
            </div>
          </div> 


            <div class="form-group text-center" >
            <button type="button" onclick="editParticipantData()" id="update-participant" class="btn btn-primary">Submit</button>
            </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</div>

<div class="modal fade" id="recordingModal" tabindex="-1" aria-labelledby="recordingModalLabel" aria-hidden="true">

  <label hidden for="ports">Port:</label>
  <select hidden id="ports" >
    <option value="prompt">Add a port...</option>
  </select>
  <label hidden for="baudrate">Baud rate:</label>
  <select hidden id="baudrate">
    <option value="9600">9600</option>
  </select>
  <input hidden id="custom_baudrate" type="number" min="1" placeholder="Enter baudrate..." hidden>
  <label hidden for="databits">Data bits:</label>
  <select hidden id="databits">
    <option value="7">7</option>
    <option value="8" selected>8</option>
  </select>
  <label hidden for="parity">Parity:</label>
  <select hidden id="parity">
    <option value="none" selected>None</option>
    <option value="even">Even</option>
    <option value="odd">Odd</option>
  </select>
  <label hidden for="stopbits">Stop bits:</label>
  <select hidden id="stopbits">
    <option value="1" selected>1</option>
    <option value="2">2</option>
  </select>
  <input hidden id="rtscts" type="checkbox">
  <label hidden for="rtscts">Hardware flow control</label>
  <input hidden id="echo" type="checkbox">
  <label hidden for="echo">Local echo</label>
  <input hidden id="enter_flush" type="checkbox">
  <label hidden for="enter_flush">Flush on enter</label>
  <input hidden id="convert_eol" type="checkbox">
  <button hidden id="download">Download output</button>
  <label hidden for="convert_eol">Convert EOL</label>


<div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content" id="recordingFormModal">

    </div>
</div>
</div>
`

{/* <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeEdit">Close</button> */}


/**
 * Render table according to json from DB
 * Input to table shld be in array of json 
 */
renderTable =(data) => {
    //render table according to data 
    var $table = $('#table');
    $(function() {
      //for visuals only 
      $table.bootstrapTable({data: transFormToTableVisual(data), exportTypes: ['csv', 'excel']})
    })

  // let eventUniqueID = events[id].eventId

  //render custom buttons 
  customButtons(); 
}


/**
 * 
 * Transform attendees data from DB to a format where bootstrap table aprove --> reason: cannot loop in the table
 * add editButton 
 * @param {*} data 
 * @returns dataArray 
 */
transFormToTableVisual = (data) => {

    // document.title = eventName;

  let dataIdArray = Object.keys(data);
  
  let dataArray = Object.values(data);

  //add id in 
  dataArray.map((m, i) => m['id'] = dataIdArray[i]); 

  dataArray.map((m => {
    if (m.round1Attendance == false ){
      m.round1Attendance = "No"
    } 

    if (m.round2Attendance == false ){
      m.round2Attendance = "No"
    } 

    if (m.round1Temperature == 0 ){
      m.round1Temperature = "NA"
    }

    if (m.round2Temperature == 0 ){
      m.round2Temperature = "NA"
    }
  }))

  //add edit button in with participant id as id 
  dataArray.map((m) => m.editButton = "")
  
  dataArray.map((m) => m.editButton = `<button type="button" class="btn btn-success" id="${m.id}" onclick='editFormPopup(${JSON.stringify(m)})'><i class="fas fa-edit"></i></button>`)

  return dataArray; 
}

closeEditPopup = () => {
  $('#editModal').modal('hide');
}


function loadEventPageContent(id) {
  console.log("Loading content for {" + events[id].eventId + "}");
  // Update text "Content loading for {id}..."

  //replace events-component with single-event-component 
  document.getElementById('events-component').innerHTML = table;


  document.title = events[id].eventData.eventName;

  let data = events[id].eventData.attendees; 

  //render table 
  renderTable(data)

  //create a hidden element so that we can extract the event ID to do query later 
  let eventIDField = document.createElement("input");
  eventIDField.setAttribute("type", "hidden");
  eventIDField.setAttribute("id", "eventIDField");
  eventIDField.setAttribute("value", events[id].eventId);
  $('#hiddenEventID').append(eventIDField);

  //if click on back button --> bring them to events page 
  //force route as of now
  $('#back-to-events').on('click', () => {
    // window.location.href="events";
    routeToEventsPage();
  })
} 


/**
 * Render buttons for : 
 * Download CSV --> if wan custom alter csv 
 * Print Barcode
 * Start attendance taking 
 */
 customButtons = (data) => {
  return {
    // downloadSheet: {
    //   text: 'Download Sheet',
    //   icon: 'fas fa-download',
    //   event: function () {
    //     console.log('downloadSheet');
    //     //inject services function here from eventServices
    //   },
    //   attributes: {
    //     title: 'Download data as xlsx / csv'
    //   }
    // },
    printBarcode : {
      text: 'Print Barcode',
      icon: 'fas fa-barcode',
      event: function () {
        console.log('Print barcode of participants');
        //get from hidden field 
        let id = document.getElementById('eventIDField').value
        console.log(id);
        getEventById(id).then(response => {
          // console.log(response.eventData.attendees);
          downloadBarcodes(response.eventData.attendees)
        });
        
      },
      attributes: {
        title: 'Print barcodes'
      }
    },
    startRecording : {
      text: 'Start',
      icon: 'fas fa-play',
      event: function () {
        recordingPopup();
      },
      attributes: {
        title: 'Start recording attendance and temperature'
      }
    },
  }
}
function inputValues(id, temp){
  document.getElementById("temperature").value = temp
  document.getElementById("attendance").value = id
  submitRecord()
}

function submitRecord() {
  // Values parse over to input textbox from bluetooth 
  let eventId = document.getElementById('eventIDField').value
  console.log("submitting temperature and attendance");
  const attendanceData = document.getElementById( "attendance").value;
  const temperatureData = document.getElementById( "temperature").value;
  let attendanceRound = 1;
  if(document.getElementById('customRadio1').checked) {
    //Attendance 2 radio button is checked
    attendanceRound = 1;

  }else if(document.getElementById('customRadio2').checked) {
    //Attendance 2 radio button is checked
    attendanceRound = 2;
  }
  // reminder to change to integer values for relevant data
  let data = {
    "participantId": attendanceData,
    "temp": parseFloat(temperatureData),
    "eventId": eventId,
    "attendanceRound": attendanceRound
  }
  console.log(data)

  //replace events-component with single-event-component 
  // document.getElementById('save-record').innerHTML = table;
  // document.getElementById('save-record');
  recordingParticipants(data)
  //if click on back button --> bring them to events page 
  //force route as of now
}
// function inputTemp(){
//   console.log("SKKKKRAAA")
//   document.getElementById("temperature").value = 36.9
// }
// function inputBarcode(){
//   document.getElementById("attendance").value = 'Mark'
// }



