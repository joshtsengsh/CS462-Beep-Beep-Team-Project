const routeToEventPage = (id) => {
  loadEventPageContent(id)
  // window.history.pushState({id}, `${id}`,
                      // `/${id}`);
}

const routeToEventsPage = () => {
  let pageName = 'events'

  loadEventsPageContent(); 

  // window.history.pushState({pageName}, pageName,
  // `/${pageName}`);
}


const routeToHomePage = () => {
  let pageName = 'home'

  window.location.href = "index.html";
  // window.history.pushState({pageName}, pageName,
    // `/`);
}

/**
 * Make nav active upon click (home / events)
 */
$( '.navbar-nav a' ).on( 'click', function () {
	$( '.navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
	$( this ).parent( 'li' ).addClass( 'active' );
});