//render when on click edit, get data of participant, populate the form with the details 
const editFormPopup = (participantData) => {

  $('#editModal').modal('show');
  
  document.getElementById('participantID').value = participantData.id

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



function editParticipantData() {
  console.log("send data");

  let participantID = document.getElementById('participantID').value; 

  let eventId = document.getElementById('eventIDField').value

  let name = document.getElementById('edit-participant-name').value; 

  let attOne = document.getElementById('attOne').value;
  let tempOne = document.getElementById('tempOne').value; 

  let attTwo = document.getElementById('attTwo').value;
  let tempTwo = document.getElementById('tempTwo').value; 

  let data = {
    eventId: eventId,
    participantID: participantID, 
    name: name, 
    attOne: attOne, 
    tempOne: tempOne, 
    attTwo: attTwo, 
    tempTwo: tempTwo
  }
  editParticipant(data);
  $('#editModal').modal('hide');
}

closeEditParticipantModal = () => {

}