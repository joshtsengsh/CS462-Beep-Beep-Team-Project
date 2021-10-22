const routeToEventPage = (id) => {
  // console.log(eventName);
  console.log("testing");
  
  loadEventPageContent(id)
  window.history.pushState({id}, `${id}`,
                      `/${id}`);
}

const routeToEventsPage = () => {
  let pageName = 'events'

  loadEventsPageContent(); 

  window.history.pushState({pageName}, pageName,
  `/${pageName}`);
}


const routeToHomePage = () => {
  let pageName = 'home'

  window.location.href = "index.html";

  window.history.pushState({pageName}, pageName,
    `/`);
  
}