const events = [
    {
      attendees: {
        0:"Rabbit", 1:"Turtle"
      },
      duration: 90,
      eventName: "The Best, Most Amazing, Glorious Event in History", 
      startDateTime: Date('01 Jan 2022 10:30:00 AM UTC+8')
    },

    {
      attendees: {
        0:"Rabbit", 1:"Turtle"
      },
      duration: 90,
      eventName: "The Best, Most Amazing, Glorious Event in History 2, Electric Bugaloo", 
      startDateTime: Date('02 Jan 2022 10:30:00 AM  UTC+8')
    },

    {
      attendees: {
        0:"Rabbit", 1:"Turtle"
      },
      duration: 120,
      eventName: "The Best, Most Amazing, Glorious Event in History 3, A Twist in Time", 
      startDateTime: Date('03 Jan 2022 10:30:00 AM  UTC+8')
    },

    {
      attendees: {
        0:"Rabbit", 1:"Turtle"
      },
      duration: 30,
      eventName: "The Best, Most Amazing, Glorious Event in History 4, Just Stop", 
      startDateTime: Date('04 Jan 2022 10:30:00 AM  UTC+8')
    }

  ];
  
  events.forEach( event => {
    const card = `<div class="col mb-5">
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