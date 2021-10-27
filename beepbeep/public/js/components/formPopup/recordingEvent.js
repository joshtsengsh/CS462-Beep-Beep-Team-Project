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