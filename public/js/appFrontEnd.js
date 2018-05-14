
$("#phone").intlTelInput({
    hiddenInput: "full_phone",
    utilsScript:'/js/utils.js'
});

/********************** NODE MAILER CODE HERE****************************/
$("document").ready(function() {

    $("#newsLetterBtn").on("click", function(e) {
        if($("#emailInput").val() === "") {
            e.preventDefault();
            alert("Please submit a valid email address.");
        } else {
            $("#modal").show();

            // Set time out to allow server to respond before clearing input.
            setTimeout(function() { 
                $("#emailInput").val("");
            }, 50);
        }
    });

    $("#closeModal").on("click", function() {
        $("#modal").hide();
    });

    $("#sendNewsLetter").on("click", function() {
        $("#adminNewsLetter").show();
    });
});

/******* END OF NODE MAILER********/



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
        agendaWeek: '.fc-agendaWeek-button',
        agendaDay: '.fc-agendaDay-button',
        updateStatus: '.updateStatus',
        
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
        
        let draftCheck = document.querySelector('#draftStatus');
        let updateStatusBtn = document.querySelector(UISelectors.updateStatus);
        let publishedCheck = document.querySelector('#publishedStatus');
        let nextWeekBtn = document.querySelector(UISelectors.nextWeek);
        let previousWeekBtn = document.querySelector(UISelectors.prevWeek);
        let registerSubmitBtn = document.querySelector(UISelectors.registerSubmitBtn);
        
        if(draftCheck){
            draftCheck.addEventListener('click', ()=>{
                updateStatusBtn.disabled = true;
            });
        }
        
        if(publishedCheck){
            publishedCheck.addEventListener('click', ()=>{
                updateStatusBtn.disabled = false;
            });
        }

        if(nextWeekBtn) {
            nextWeekBtn.addEventListener('click', updateStatusCard);
        }

        
        if(previousWeekBtn) {
            previousWeekBtn.addEventListener('click', updateStatusCard);
        }

        if(updateStatusBtn){
            updateStatusBtn.addEventListener('click', (e)=>{
                let firstDate = document.querySelector('.fc-axis').nextElementSibling.getAttribute('data-date');
                let lastDate = document.querySelector('.fc-axis').nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute('data-date');
                let managerComments = document.querySelector('#comments').value;
                
                if(publishedCheck.checked){
                    
                    let newSchedule = {
                        managerComments: managerComments,
                        scheduleStart: firstDate,
                        scheduleEnd: lastDate,
                        scheduleStatus: 'published'
                    }
                    
                    fetch('/dashboard', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(newSchedule)
                    }).then(function(response) {
                        return response.json();
                    }).then((data)=>{
                        
                        document.querySelector('.commentCard').style.display = 'block';
                        document.querySelector('.managerComments').innerHTML = data.managerComments;
                        document.querySelector('#comments').value = '';
                        document.querySelector('#comments').disabled = true;
                        updateStatusBtn.disabled = true;
                        
                        let events = Array.from(document.querySelectorAll('.fc-v-event'));
                        
                        events.forEach(event => {
                            if(event.classList.contains('FOHDraftShift')){
                                event.classList.remove('FOHDraftShift')
                            }else if(event.classList.contains("BOHDraftShift")){
                                event.classList.remove('BOHDraftShift')
                            }
                        })
                        
                    }).catch(function (error) {  
                        console.log('Request failure: ', error);  
                    });
                }
                

                e.preventDefault();
            });
        }
        
        
        

        
        /*----------------CHANGE Events-----------------*/
        
    }
    
    const displayManagerCalander = function(){
        
        fetch(`/dashboard/shifts.json`)
          .then(function(response) {
            return response.json();
          })
          .then(function(eventData) {
            
            eventData.map(data => {     
                data.start = moment(data.start, 'YYYY-MM-DD H:mm:ss').format();
                data.end = moment(data.end, 'YYYY-MM-DD H:mm:ss').format();
                if(data.shiftStatus == 'published'){
                    data.className = '';
                }
            });
                
            
                 $('#managersCalendar').fullCalendar({
                    themeSystem: 'bootstrap4',
                    defaultView: 'agendaWeek',
                    firstDay: 1,
                    allDaySlot: false,
                    slotEventOverlap: true,
                    columnHeaderFormat: 'ddd M.D YYYY',
                    header: {
                      left: 'prev,next',
                      center: 'title',
                      right: 'addEventButton, month, agendaWeek, agendaDay'
                    },
                    minTime:  "6:00:00",
                    maxTime: "24:00:00",
                    events: eventData,
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
            
            
                    $('#employeesCalendar').fullCalendar({
                    themeSystem: 'bootstrap4',
                    defaultView: 'agendaWeek',
                    firstDay: 1,
                    allDaySlot: false,
                    slotEventOverlap: true,
                    columnHeaderFormat: 'ddd M.D YYYY',
                    header: {
                      left: 'prev,next',
                      center: 'title',
                      right: 'month, agendaWeek, agendaDay'
                    },
                    minTime:  "6:00:00",
                    maxTime: "24:00:00",
                    events: eventData,
                    eventLimit: true,
                    selectable:true,
                    selectHelper: false,
                    editable: false,
                  });
            
                        updateStatusCard();
            
                        let managersCalendar = document.querySelector('#managersCalendar');
            
                        if(managersCalendar){
                            let headerDays = Array.from(document.querySelectorAll(UISelectors.dayHeader));
                    
                            headerDays.forEach(day=>{
                                let date = day.getAttribute('data-date');

                                let addShiftBtn = document.createElement('button');
                                    addShiftBtn.classList = 'btn btn-secondary btn-block addShiftBtn';
                                    addShiftBtn.innerHTML = 'Add Shift';
                                    addShiftBtn.setAttribute('data-date', date);
                                day.appendChild(addShiftBtn);
                            });    
            
                            let nextWeekBtn = document.querySelector(UISelectors.nextWeek);
                            if(nextWeekBtn) {
                                nextWeekBtn.addEventListener('click', displayManagerCalander);
                            }

                            let previousWeekBtn = document.querySelector(UISelectors.prevWeek);
                            if(previousWeekBtn) {
                                previousWeekBtn.addEventListener('click', displayManagerCalander);
                            }

                            let agendaWeekBtn = document.querySelector(UISelectors.agendaWeek);
                            if(agendaWeekBtn) {
                                agendaWeekBtn.addEventListener('click', displayManagerCalander);
                            }

                            let agendaDayBtn = document.querySelector(UISelectors.agendaDay);
                            if(agendaDayBtn) {
                                agendaDayBtn.addEventListener('click', displayManagerCalander);
                            }
                            
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

          });

    }
    
    const updateStatusCard = function(){

            fetch(`/dashboard/schedules.json`)
              .then(function(response) {
                return response.json();
            }).then(function(scheduleData) {
                let managerCalendar = document.querySelector('#managersCalendar'),
                    employeeCalendar = document.querySelector('#employeesCalendar');
                
                if(managerCalendar || employeeCalendar){
                    
                    let calendarStartDate = document.querySelector('.fc-axis').nextElementSibling.getAttribute('data-date');
                    
                    scheduleData.forEach(schedule => {

                        if(schedule.scheduleStart === calendarStartDate && schedule.scheduleStatus === "published"){

                            document.querySelector('.commentCard').style.display = 'block';
                            document.querySelector('.managerComments').innerHTML = schedule.managerComments;
                            document.querySelector('#comments').value = '';
                            document.querySelector('#comments').disabled = true;
                            document.querySelector(UISelectors.updateStatus).disabled = true;
                            document.querySelector('#publishedStatus').checked = true;
                        } else {
                            document.querySelector('.commentCard').style.display = 'none';
                            document.querySelector('.managerComments').innerHTML = '';
                            document.querySelector('#comments').value = '';
                            document.querySelector('#comments').disabled = false;
                            document.querySelector(UISelectors.updateStatus).disabled = false;
                            document.querySelector('#draftStatus').checked = true;
                        }
                    })    
                }
                
                
            }).catch(err =>{
                console.log(err);
                return;
            });
        
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
    
    
    

    
    //Public Methods
    return {
        init: () => {
            displayManagerCalander();
            
            loadEventListeners();
            appendTimeIntervals('00:00', '24:00');
            
        }
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();
        
        

//data tables function
$(document).ready( function () {
    $('#employeeTable').DataTable();
});


