$(function() {

  $('#calendar').fullCalendar({
    themeSystem: 'bootstrap4',
    defaultView: 'agendaWeek',
    firstDay: 1,
    allDaySlot: false,
    slotEventOverlap: true,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'basicWeek, month'
    },
    eventLimit: true // allow "more" link when too many events
  });

});
        
        
        
        
        
        
        
     