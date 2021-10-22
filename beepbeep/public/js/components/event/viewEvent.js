//code for viewing of individual event 
// render the view here 
let table = `
<div> 
  <div id="single-event-component">
    <button type="button" class="btn btn-primary" id="back-to-events">Back</button>
    <table id="table"
    data-search="true"
    data-buttons="customButtons"
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

  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
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
            <button type="submit" id="update-participant" class="btn btn-primary">Submit</button>
            </div>
        </form>
      </div>
    </div>
  </div>
  </div>

</div>
`

{/* <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeEdit">Close</button> */}


/**
 * Render table according to json from DB
 * Input to table shld be in array of json 
 */
renderTable =(eventNo) => {
    //render table according to data 
    var $table = $('#table');
    $(function() {
  
      //mock json as of now 

      document.title = events[eventNo].eventName;
      
      let data = events[eventNo].attendees; 


      //for visuals only 
      $table.bootstrapTable({data: transFormToTableVisual(data)})
    })
}

/**
 * Listen editButton class
 */
editFormPopup = (participantData) => {
  console.log(participantData);
  
  renderEditParticipantPopup(participantData); 
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

  console.log(dataArray);

  return dataArray; 
}

closeEditPopup = () => {
  $('#editModal').modal('hide');
}


/**
 * Render buttons for : 
 * Download CSV 
 * Print Barcode
 * Start attendance taking 
 */
customButtons = () => {
  return {
    downloadSheet: {
      text: 'Download Sheet',
      icon: 'fas fa-download',
      event: function () {
        console.log('downloadSheet');
        //inject services function here from eventServices
      },
      attributes: {
        title: 'Download data as xlsx / csv'
      }
    },
    printBarcode : {
      text: 'Print Barcode',
      icon: 'fas fa-barcode',
      event: function () {
        console.log('Print barcode of participants');
        //inject services function here from eventServices
      },
      attributes: {
        title: 'Print barcodes'
      }
    },
    startRecording : {
      text: 'Start',
      icon: 'fas fa-play',
      event: function () {
        console.log('start recording');
        //inject services function here from eventServices
      },
      attributes: {
        title: 'Start recording attendance and temperature'
      }
    },
  }
}


function loadEventPageContent(id) {
  console.log("Loading content for {" + id + "}");
  // Update text "Content loading for {id}..."

  //replace events-component with single-event-component 
  document.getElementById('events-component').innerHTML = table;

  //render table 
  renderTable(id)

  //render custom buttons 
  customButtons()

  //if click on back button --> bring them to events page 
  //force route as of now
  $('#back-to-events').on('click', () => {
    // window.location.href="events";
    routeToEventsPage();
  })
}
