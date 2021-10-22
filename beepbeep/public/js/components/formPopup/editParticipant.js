//render when on click edit, get data of participant, populate the form with the details 
renderEditParticipantPopup = (participantData) => {

  $('#editModal').modal('show');

  document.getElementById('editModalLabel').innerText = "Editing details of " + participantData.attendeeName;

  document.getElementById('edit-participant-name').value = participantData.attendeeName;

  document.getElementById('attOne').value = participantData.round1Attendance != "No" ? "Yes": "No";
  document.getElementById('tempOne').value = participantData.round1Temperature; 

  document.getElementById('attTwo').value = participantData.round2Attendance != "No" ? "Yes": "No";
  document.getElementById('tempTwo').value = participantData.round2Temperature; 
}

//close modal 
$('#close-edit').on('click', function() {
  console.log("test");
  $('#editModal').modal('hide');
})


$('#update-participant').on('click', function() {
  console.log("send data");
  // $('#editModal').modal('hide');
})

closeEditParticipantModal = () => {

}