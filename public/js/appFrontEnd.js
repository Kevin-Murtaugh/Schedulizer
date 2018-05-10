
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
        document.querySelector(UISelectors.nextWeek).addEventListener('click', appendAddShiftBtns);
        document.querySelector(UISelectors.prevWeek).addEventListener('click', appendAddShiftBtns);
              
        document.querySelector(UISelectors.tableBordered).addEventListener('click', (e)=>{
            if(e.target.classList.contains('addShiftBtn')){
                let date = e.target.getAttribute('data-date');
                location.href = `/dashboard/add-shift/${date}`;
            }
            
        });
        
        
        /*----------------CHANGE Events-----------------*/
        
    }
    
    const appendAddShiftBtns = function(){
        let headerDays = Array.from(document.querySelectorAll(UISelectors.dayHeader));
        
        headerDays.forEach(day=>{
            let date = day.getAttribute('data-date');

            let addShiftBtn = document.createElement('button');
                addShiftBtn.classList = 'btn btn-secondary addShiftBtn';
                addShiftBtn.innerHTML = 'Add Shift';
                addShiftBtn.setAttribute('data-date', date);
            day.appendChild(addShiftBtn);
        })
    }
    
    //Public Methods
    return {
        init: () => {
            appendAddShiftBtns();
            loadEventListeners();
            
        }
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();
        
        
        
        
        
        
        
     