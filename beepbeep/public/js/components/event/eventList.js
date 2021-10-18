console.log(events);

events.forEach( (event, i) => {
    const card = `<div class="col mb-5" id="${i}">
    <div class="card h-100">
      <div class="card-header text-center"><b>${event.startDateTime}</b></div>
      <div class="card-body p-4" style="transform: rotate(0);">
        <div class="text-center">
          <h5 class="fw-bolder">
            <a href="#" class="link-unstyled stretched-link">
            <p>${event.eventName}</p>
            <p>Duration: ${event.duration}min</p>
            </a>

          </h5>
        </div>
      </div>
    </div>
  </div>`
    const row = cardContainer = document.getElementById('card-row');
    const ele = document.createElement('div');
    ele.innerHTML = card;
    row.appendChild(ele.firstChild);
  })



/*
* on click event card, route to event 
*/
document.addEventListener("DOMContentLoaded", function(e) {
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
                    routeToEvent(cards.children[index].id);
                  } 
            }    
        })(i);
    }
  });