$(function() {

  fetch(`/dashboard/shifts.json`)
      .then(function(response) {
        return response.json();
      })
      .then(function(eventData) {
        console.log(eventData);

      });

  $('#calendar').fullCalendar({
    themeSystem: 'bootstrap4',
    defaultView: 'agendaWeek',
    firstDay: 1,
    allDaySlot: false,
    slotEventOverlap: true,
    columnHeaderFormat: 'ddd M.D YYYY',
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'addEventButton, basicWeek, month'
    },
    minTime:  "6:00:00",
    maxTime: "24:00:00",
    eventLimit: true,
    selectable:true,
    selectHelper: true,
    editable: true,
    
    customButtons: {
      addEventButton: {
        text: 'Add Employee',
        click: function() {
            location.href = `/employee/add`;  
        }
      }
    }
  });

});

  



//===============ITEM CONTROLLER==================
const ItemCtrl = (function(){

    //Public Methods
    return {

    }

})();



//================UI CONTROLLER==================
const UICtrl = (function(){
    
    const UISelectors = {
        //Buttons
        addShiftBtn: '.addShiftBtn',
        
        //Inputs
        timeInterval: '.timeInterval',
        
        //Selects
        
        
        //TextAreas
        
        //Calendar
        dayHeader: '.fc-day-header',
        nextWeek: '.fc-next-button',
        prevWeek: '.fc-prev-button',
        
        //Table
        tableBordered: '.table-bordered'
        
        
    }
    
    //Public Methods
    return {
        getSelectors: () => {
            return UISelectors;
        }
    }

})();



//==============APP CONTROLLER=================
const AppCtrl = (function(ItemCtrl, UICtrl){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    
    
    
    const loadEventListeners = ()=>{
        /*----------------INPUT Events-----------------*/
        
        /*----------------CLICK Events-----------------*/

        let nextWeekBtn = document.querySelector(UISelectors.nextWeek);
        if(nextWeekBtn) {
            nextWeekBtn.addEventListener('click', appendAddShiftBtns);
        }

        let previousWeekBtn = document.querySelector(UISelectors.prevWeek)
        if(previousWeekBtn) {
            previousWeekBtn.addEventListener('click', appendAddShiftBtns);
        }
        
        let tableBordered = document.querySelector(UISelectors.tableBordered);
        if(tableBordered) {
            tableBordered.addEventListener('click', (e)=>{
                if(e.target.classList.contains('addShiftBtn')){
                    let date = e.target.getAttribute('data-date');
                    let department = document.querySelector('#departmentSelect');
                    department = department.options[department.selectedIndex].value;
                    location.href = `/dashboard/add-shift/${date}?department=${department}`;
                }
                
            });
        }   
        
        

        
        /*----------------CHANGE Events-----------------*/
        
    }
    
    const appendAddShiftBtns = function(){
        let headerDays = Array.from(document.querySelectorAll(UISelectors.dayHeader));
        
        headerDays.forEach(day=>{
            let date = day.getAttribute('data-date');

            let addShiftBtn = document.createElement('button');
                addShiftBtn.classList = 'btn btn-secondary btn-block addShiftBtn';
                addShiftBtn.innerHTML = 'Add Shift';
                addShiftBtn.setAttribute('data-date', date);
            day.appendChild(addShiftBtn);
        })
    }
    
    const appendTimeIntervals = function(t1, t2){
        let toInt  = time => ((h,m) => h*2 + m/30)(...time.split(':').map(parseFloat)),
        toTime = int => [Math.floor(int/2), int%2 ? '30' : '00'].join(':'),
        range  = (from, to) => Array(to-from+1).fill().map((_,i) => from + i),
        eachHalfHour = (t1, t2) => range(...[t1, t2].map(toInt)).map(toTime);

        let halfHourInterval = eachHalfHour(t1, t2);
        let timeIntervalSelect = Array.from(document.querySelectorAll(UISelectors.timeInterval));
        
        if(timeIntervalSelect){
            timeIntervalSelect.forEach(select => {
                halfHourInterval.forEach(interval => {
                    let option = document.createElement('option');
                    option.text = moment(`${interval}`, 'HH:mm').format('hh:mm a');
                    option.value = interval;
                    select.appendChild(option);
                    
                });
            });
        }
    }
    
    
    const loadCalendarSettings = function(){
        let userID = document.querySelector('#id');
        
        if(userID){
            userID = userID.value;
            
            fetch(`/dashboard?userid=${userID}`)
              .then(function(response) {
                return response.json();
              })
              .then(function(data) {
                console.log(data);
              });
            
        }
        
    }
    

    
    //Public Methods
    return {
        init: () => {
            appendAddShiftBtns();
            loadEventListeners();
            appendTimeIntervals('00:00', '24:00');
            
        }
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();
        
        

