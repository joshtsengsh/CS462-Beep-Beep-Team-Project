/**
 * Listen startRecording class
 */
const recordingPopup = () => {
  console.log("Recording");
  renderConnectionModal();
  openRecordingPopup(); 
}

const renderConnectionModal = () => {
  let inputConnectionModal = `
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title w-100 text-center" id="recordingModalLabel">Please Connect to device before scanning</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body text-center">
      <button id="connect" class="btn btn-primary">Choose device</button>
    </div>
  </div> 
  `
  document.getElementById('recordingFormModal').innerHTML = inputConnectionModal; 
}

openRecordingPopup = () => {
  $('#recordingModal').modal('show');

  // if not connected --> don show the form 

  bluetoothLogic(); 
  // once connected --> replace the button and show the form 
}

function inputTemp(){
  document.getElementById("tempValue").value = 36.9
}
function inputBarcode(){
  document.getElementById("barcodeValue").value = 'Mark'
}


const renderRecordingModalForm = () => {
  let input = `
    <div class="modal-header">
      <h5 class="modal-title" id="recordingModalLabel">Scan</h5>
    </div>
    <div class="modal-body">
      <div class="custom-control custom-radio">
        <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value = 1 checked="checked">
        <label class="custom-control-label" for="customRadio1">Attendance 1</label>
      </div>
      <div class="custom-control custom-radio">
        <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value = 2>
        <label class="custom-control-label" for="customRadio2">Attendance 2</label>
      </div>
      <br>
      <div class="mb-3">
          <label for="attendanceInput" class="form-label">Name</label>
          <input type="text" class="form-control" id="attendance" placeholder="Please Scan Barcode">
      </div>
      <div class="mb-3">
          <label for="temperatureInput" class="form-label">Temperature</label>
          <input type="text" class="form-control" id="temperature" placeholder="Please Scan Temperature">
      </div>
    </div>
    <div class="modal-footer justify-content-center">

    <button type="button" onclick="submitRecord()" class="btn btn-primary" id="save-record" >Save changes</button>
    <button type="button" onclick="closeAttendance()" data-bs-dismiss="modal" class="btn btn-primary bg-danger" id="yeet" >End Attendance Taking</button>
    </div>
  `
  document.getElementById('recordingFormModal').innerHTML = input; 
  // $("#myModal").on("hidden", function (){
  //   // loadEventPageContent()
  //   console.log("close function")
  //   // getEventById(events[id].eventId).then((r) => renderTable(r.eventData.attendees))
  // });
  // $('#myModal').on('closed.bs.alert', function () {
  //   console.log("close function")
    
  // })
}


successSubmission = (sucessMsg) => {
  let message = `
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title w-100 text-center">${sucessMsg}</h5>
    </div>
  </div> 
  `
  document.getElementById('recordingFormModal').innerHTML = message; 

  setTimeout(function(){renderRecordingModalForm()}, 2000);
}