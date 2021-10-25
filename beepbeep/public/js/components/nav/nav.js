//on click event nav 

$('#eventsPage').mouseover(function(){
  $('#eventsPage').css('cursor', 'pointer');
})

$('#eventsPage').on('click', function() {
  routeToEventsPage()
})

$('#homePage').mouseover(function(){
  $('#homePage').css('cursor', 'pointer');
})

$('#homePage').on('click', function() {
  routeToHomePage(); 
})

