
$("#phone").intlTelInput({
    hiddenInput: "full_phone",
    utilsScript:'/js/utils.js'
});

/********************** NODE MAILER CODE HERE****************************/
$("document").ready(function() {
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
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
        $("#closeAdminModal").on("click", function() {
            $("#adminNewsLetter").hide();
        }); 
    });
});

/******* END OF NODE MAILER********/

/******************FORM VALIDATION****************/
$(document).ready(function() {
    $('#signinForm').formValidation({
        framework: 'bootstrap4',
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The username can only consist of alphabetical, number and underscore'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    }
                }
            }
        }
    });
});

$(document).ready(function() {
    $('#emailForm').formValidation({
        framework: 'bootstrap4',
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            email: {
                validators: {
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    }
                }
            }
        }
    });
});


        




$(document).ready(function() {
    $('#registrationForm').formValidation({
        framework: 'bootstrap4',
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            firstName: {
                row: '.col-xs-4',
                validators: {
                    notEmpty: {
                        message: 'The first name is required'
                    }
                }
            },
            lastName: {
                row: '.col-xs-4',
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    callback: {
                        callback: function(value, validator, $field) {
                            var password = $field.val();
                            if (password == '') {
                                return true;
                            }

                            var result  = zxcvbn(password),
                                score   = result.score,
                                message = result.feedback.warning || 'The password is weak';

                            // Update the progress bar width and add alert class
                            var $bar = $('#strengthBar');
                            switch (score) {
                                case 0:
                                    $bar.attr('class', 'progress-bar bg-danger')
                                        .css('width', '1%');
                                    break;
                                case 1:
                                    $bar.attr('class', 'progress-bar bg-danger')
                                        .css('width', '25%');
                                    break;
                                case 2:
                                    $bar.attr('class', 'progress-bar bg-danger')
                                        .css('width', '50%');
                                    break;
                                case 3:
                                    $bar.attr('class', 'progress-bar bg-warning')
                                        .css('width', '75%');
                                    break;
                                case 4:
                                    $bar.attr('class', 'progress-bar bg-success')
                                        .css('width', '100%');
                                    break;
                            }

                            // We will treat the password as an invalid one if the score is less than 3
                            if (score < 3) {
                                return {
                                    valid: false,
                                    message: message
                                }
                            }

                            return true;
                        }
                    }
                }
            },
            passwordConfirm: {
                validators: {
                    identical: {
                        field: 'password',
                        message: 'The confirm password does not match the password'
                    }
                }
            }
        }
    });
});



const usStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];


(function populateStateSelects(usStates){    
    const statesSelect = Array.prototype.slice.call(document.querySelectorAll('.states'));
    statesSelect.forEach(select=>{
        usStates.forEach(state=>{
            let option = document.createElement("option");
            option.text = state;
            option.value = state;
            select.add(option);
        });
    });   
})(usStates);


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
        agendaWeek: '.fc-timelineWeek-button',
        agendaDay: '.fc-timelineDay-button',
        updateStatus: '.updateStatus',
        
        //Inputs
        timeInterval: '.timeInterval',
        
        //Selects
        departmentSelect: '#departmentSelect',
        
        //TextAreas
        
        //Calendar
        dayHeader: '.fc-cell-content',
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

        if(updateStatusBtn ){
            updateStatusBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                let managerComments = document.querySelector('#comments').value;
                let headerDays = document.querySelectorAll('.fc-scroller-canvas')[1];
                let firstDate = Array.from(headerDays.firstElementChild.firstElementChild.lastElementChild.firstElementChild.children)[0].getAttribute('data-date').split('T')[0];
                let lastDate = Array.from(headerDays.firstElementChild.firstElementChild.lastElementChild.firstElementChild.children)[6].getAttribute('data-date').split('T')[0];
                
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
                        
                        
                        document.querySelector('.managerComments').innerHTML = data.managerComments;
                        document.querySelector('#comments').value = '';
                        document.querySelector('#comments').disabled = true;
                        let loaders = document.querySelectorAll('.loader');
                        
                        for (var i = 0; i < loaders.length; i++) {
                            var currentloaders = loaders[i];
                            currentloaders.style.display = 'block';
                        }

                        let cardAfter = document.querySelectorAll('.card-after');
                        
                        for (var i = 0; i < cardAfter.length; i++) {
                            var currentcardAfter = cardAfter[i];
                            currentcardAfter.style.display = 'block';
                        }
                        
                        let cards = document.querySelectorAll('.card');
                        
                        for (var i = 0; i < cards.length; i++) {
                            var currentCard = cards[i];
                            currentCard.style.border = 0;
                        }
                        
                        updateStatusBtn.disabled = true;
                        
                        
                        
                        setInterval(()=>{
                            let events = Array.from(document.querySelectorAll('.fc-v-event'));

                            events.forEach(event => {
                                if(event.classList.contains('FOHDraftShift')){
                                    event.classList.remove('FOHDraftShift');
                                }else if(event.classList.contains("BOHDraftShift")){
                                    event.classList.remove('BOHDraftShift');
                                }
                            });
                            
                            let loaders = document.querySelectorAll('.loader');
                            for (var i = 0; i < loaders.length; i++) {
                                var currentloaders = loaders[i];
                                currentloaders.style.display = 'none';
                            }

                            let cardAfter = document.querySelectorAll('.card-after');

                            for (var i = 0; i < cardAfter.length; i++) {
                                var currentcardAfter = cardAfter[i];
                                currentcardAfter.style.display = 'none';
                            }

                            let cards = document.querySelectorAll('.card');

                            for (var i = 0; i < cards.length; i++) {
                                var currentCard = cards[i];
                                currentCard.style.border = 0;
                            }
                            
                            document.querySelector('.commentCard').style.display = 'block';
                            
                            
                            
                        }, 3000);
                        
                        
                        
                    }).catch(function (error) {  
                        console.log('Request failure: ', error);  
                    });



                
            });
        }

    } //End of Event Listeners
    

    
    const getCalendarData = function(selectedDepartment, departmentText){
        
        fetch(`/dashboard/shifts.json`)
          .then(function(response) {
            return response.json();
          })
          .then(function(eventData) {

                        eventData.map(data => {     
                            data.start = moment(data.start, 'YYYY-MM-DD H:mm:ss').format();
                            data.end = moment(data.end, 'YYYY-MM-DD H:mm:ss').format();
                            data['resourceId'] = data['userId'];
                            delete data['userId'];
                            if(data.shiftStatus == 'published'){
                                data.className = '';
                            }
                        });
      
                        let resources = eventData.map(event => {

                                let department;
                                if(event.department == 'BOH'){
                                    department = 'Back of House';
                                }else if(event.department == 'FOH'){
                                    department = 'Front of House';
                                }
                                return {
                                    id: event.resourceId,
                                    title: event.title,
                                    department: department
                                }      

                        });
            
                        drawCalendars(eventData, resources, departmentText);
                        updateStatusCard();
                        appendAddShiftBtn();
                        calendarEventListeners();

          });

    }
    
    const appendAddShiftBtn = function(){
        let headerDays = document.querySelectorAll('.fc-scroller-canvas')[1];
            if(headerDays){
                let daysArray = Array.from(headerDays.firstElementChild.firstElementChild.lastElementChild.firstElementChild.children);  
                
                if(daysArray.length === 7){
                    daysArray.forEach(day=>{

                        let date = day.getAttribute('data-date').split('T')[0];

                        let addShiftBtn = document.createElement('button');
                            addShiftBtn.classList = 'btn btn-secondary addShiftBtn btn-block';
                            addShiftBtn.innerHTML = 'Add Shift';
                            addShiftBtn.setAttribute('data-date', date);
                        day.appendChild(addShiftBtn);
                    });
                }else {
                    let date = daysArray[0].getAttribute('data-date').split('T')[0];
                    
                    let target = document.querySelector('.fc-right').firstElementChild;

                    let addShiftBtn = document.createElement('button');
                            addShiftBtn.classList = 'btn btn-secondary addShiftBtn btn-block';
                            addShiftBtn.innerHTML = 'Add Shift';
                            addShiftBtn.setAttribute('data-date', date);
                        target.prepend(addShiftBtn);
                }
                      
            }
    }
    
    const calendarEventListeners = function(){
        let nextWeekBtn = document.querySelector(UISelectors.nextWeek);
            if(nextWeekBtn) {
                nextWeekBtn.addEventListener('click', getCalendarData);
            }

            let previousWeekBtn = document.querySelector(UISelectors.prevWeek);
            if(previousWeekBtn) {
                previousWeekBtn.addEventListener('click', getCalendarData);
            }

            let agendaWeekBtn = document.querySelector(UISelectors.agendaWeek);
            if(agendaWeekBtn) {
                agendaWeekBtn.addEventListener('click', getCalendarData);
                document.querySelector(UISelectors.updateStatus).disabled = false;
            }

            let agendaDayBtn = document.querySelector(UISelectors.agendaDay);
            if(agendaDayBtn) {
                agendaDayBtn.addEventListener('click', getCalendarData);
                document.querySelector(UISelectors.updateStatus).disabled = true;
            }
        
        let managersCalendar = document.querySelector('#managersCalendar');
            if(managersCalendar) {
                managersCalendar.addEventListener('click', (e)=>{
                    if(e.target.classList.contains('addShiftBtn')){
                        let date = e.target.getAttribute('data-date');
                        location.href = `/dashboard/add-shift/${date}`;
                    }
                });
            }  
    }
    
    const drawCalendars = function(eventData, resources, departmentText){

            $('#managersCalendar').fullCalendar({
                
                themeSystem: 'bootstrap4',
                defaultView: 'timelineWeek',
                firstDay: 1,
                allDaySlot: false,
                slotEventOverlap: true,
                columnHeaderFormat: 'ddd M.D YY',
                header: {
                  left: 'prev,next,addEmployeeButton',
                  center: 'title',
                  right: 'timelineDay,timelineWeek,timelineMonth'
                },
                minTime:  "6:00:00",
                maxTime: "24:00:00",
                resourceLabelText: 'Departments',
                resourceGroupField: 'department',
                resources: resources,
                events: eventData,
                eventLimit: true,
                selectable:true,
                selectHelper: true,
                editable: true,
                customButtons: {
                  addEmployeeButton: {
                    text: 'New Employee',
                    click: function() {
                        location.href = `/employee/add`;  
                    }
                  }
                }
            });
             
        
        $('#employeesCalendar').fullCalendar({
                
                themeSystem: 'bootstrap4',
                defaultView: 'timelineWeek',
                firstDay: 1,
                allDaySlot: false,
                slotEventOverlap: true,
                columnHeaderFormat: 'ddd M.D YY',
                header: {
                  left: 'prev,next,',
                  center: 'title',
                  right: 'timelineDay,timelineWeek,timelineMonth'
                },
                minTime:  "6:00:00",
                maxTime: "24:00:00",
                resourceLabelText: 'Departments',
                resourceGroupField: 'department',
                resources: resources,
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
        
    }
    

    const updateStatusCard = function(){

            fetch(`/dashboard/schedules.json`)
              .then(function(response) {
                return response.json();
            }).then(function(scheduleData) {
                let managerCalendar = document.querySelector('#managersCalendar'),
                    employeeCalendar = document.querySelector('#employeesCalendar');
                
                if(managerCalendar || employeeCalendar){
                    let headerDays = document.querySelectorAll('.fc-scroller-canvas')[1];
                    let daysArray = Array.from(headerDays.firstElementChild.firstElementChild.lastElementChild.firstElementChild.children)[0].getAttribute('data-date').split('T')[0];

                    scheduleData.forEach(schedule => {

                        if(schedule.scheduleStart === daysArray && schedule.scheduleStatus === "published"){

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
            getCalendarData();
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


