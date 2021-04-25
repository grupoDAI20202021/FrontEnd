let url1="http://127.0.0.1:8080";
'use strict';

/* eslint-disable require-jsdoc, no-unused-vars */

var CalendarList = [];

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
}

function addCalendar(calendar) { // adicionar tipo de atividade
    CalendarList.push(calendar);
}

function findCalendar(id) {
    var found;

    CalendarList.forEach(function(calendar) {
        if (calendar.id === id) {
            found = calendar;
        }
    });

    return found || CalendarList[0];
}

function hexToRGBA(hex) {
    var radix = 16;
    var r = parseInt(hex.slice(1, 3), radix),
        g = parseInt(hex.slice(3, 5), radix),
        b = parseInt(hex.slice(5, 7), radix),
        a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
    var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

    return rgba;
}

(async function() { // adicionar todos os tipos de atividades
let activityType;
var calendar;

    var id = 0;
    const wait = await setUpActivityType();
    setUpCalendar(/*viewName, renderStart, renderEnd*/);
			async function setUpActivityType() {
                
			const res = await fetch(url1 + '/api/activitiestype', {
			  headers: {
				  'Content-Type': 'application/json'
			  },
			  mode: 'cors',
			  method: 'GET',
			  credentials: 'include'
		  }); 
			activityType = await res.json();

            for(let i=0;i<activityType.length;i++){
                console.log("hello")
                calendar = new CalendarInfo();
                id =activityType[i].idActivityType;
                calendar.id = String(id);
                calendar.name = activityType[i].name;
                calendar.color = '#ffffff';
                calendar.bgColor = activityType[i].color;
                calendar.dragBgColor = activityType[i].color;
                calendar.borderColor = activityType[i].color;
                addCalendar(calendar);
            }
            return CalendarList;
        }
        

        
   
})
();










'use strict';

//hello

/*eslint-disable*/

var ScheduleList = [];

var SCHEDULE_CATEGORY = [
    'milestone',
    'task'
];

function ScheduleInfo() {
    this.id = null;
    this.calendarId = null;

    this.title = null;
    this.body = null;
    this.isAllday = false;
    this.start = null;
    this.end = null;
    this.category = '';
    this.dueDateClass = '';

    this.color = null;
    this.bgColor = null;
    this.dragBgColor = null;
    this.borderColor = null;
    this.customStyle = '';

    this.isFocused = false;
    this.isPending = false;
    this.isVisible = true;
    this.isReadOnly = false;
    this.goingDuration = 0;
    this.comingDuration = 0;
    this.recurrenceRule = '';
    this.state = '';

    this.raw = {
        memo: '',
        hasToOrCc: false,
        hasRecurrenceRule: false,
        location: null,
        class: 'public', // or 'private'
        creator: {
            name: '',
            avatar: '',
            company: '',
            email: '',
            phone: ''
        }
    };
}

function generateTime(schedule, renderStart, renderEnd) { // penso que é gerar as datas de cada atividade
    var startDate = moment(renderStart.getTime())
    
    var endDate = moment(renderEnd.getTime());
    var diffDate = endDate.diff(startDate, 'days');
    schedule.isAllday = chance.bool({likelihood: 30}); // nao sei o que faz
    if (schedule.isAllday) {
        schedule.category = 'allday';
    } else if (chance.bool({likelihood: 30})) {
        schedule.category = SCHEDULE_CATEGORY[chance.integer({min: 0, max: 1})];
        if (schedule.category === SCHEDULE_CATEGORY[1]) {
            schedule.dueDateClass = 'morning';
        }
    } else {
        schedule.category = 'time';
    }

    startDate.add(chance.integer({min: 0, max: diffDate}), 'days');
    startDate.hours(chance.integer({min: 0, max: 23}))
    startDate.minutes(chance.bool() ? 0 : 30);
    schedule.start = startDate.toDate();  // data que começa a atividade
    
    endDate = moment(startDate);
    if (schedule.isAllday) {
        endDate.add(chance.integer({min: 0, max: 3}), 'days');
    }

    schedule.end = endDate  // data que acaba a atividade
        .add(chance.integer({min: 1, max: 4}), 'hour')
        .toDate();
       
    if (!schedule.isAllday && chance.bool({likelihood: 20})) { // nao sei o que faz
        schedule.goingDuration = chance.integer({min: 30, max: 120});
        schedule.comingDuration = chance.integer({min: 30, max: 120});;

        if (chance.bool({likelihood: 50})) {
            schedule.end = schedule.start;
        }
    }
}

function generateNames() {// nao sei o que faz - gerar
    var names = [];
    var i = 0;
    var length = chance.integer({min: 1, max: 10});

    for (; i < length; i += 1) {
        names.push(chance.name());
    }

    return names;
}

function generateRandomSchedule(/*calendar, renderStart, renderEnd*/) {  // gerar atividades neste caso random
    
   // var schedule = new ScheduleInfo();
    var list= [];
    ScheduleList= [];
    fetch(url1 + '/api/activities/by-townhall/'+ localStorage.getItem("userLogado"))
        .then(res => res.json())
        .then((out) => {
            $.each(out, function(index, value) {
               console.log(value)
            list.push(value); // por na lista de aitividades
            });
            /*let panels = document.querySelectorAll(".sponsor-div-delete");
            console.log(panels[0].id)*/
            for (let i = 0; i < list.length; i++) {
                
                listSchedules(list[i])
            }
            
            cal.createSchedules(ScheduleList);
           // console.log(ScheduleList)
        }).catch(err => console.error(err));
        

    //schedule.id = chance.guid();
    //schedule.calendarId = calendar.id;

   // schedule.title = chance.sentence({words: 3}); // titulo
    //schedule.body = chance.bool({likelihood: 20}) ? chance.sentence({words: 10}) : ''; // texto descritivo se
    //schedule.isReadOnly = chance.bool({likelihood: 20}); // dar para editar a atividade ou nao
    //generateTime(schedule, renderStart, renderEnd);

    //schedule.isPrivate = chance.bool({likelihood: 10}); // se é privada ou nao - remover em principio
    //schedule.location = chance.address(); // localizaçao da atividade
    //schedule.attendees = chance.bool({likelihood: 70}) ? generateNames() : []; // possibilidade de aparecer inscritos
  //  schedule.recurrenceRule = chance.bool({likelihood: 20}) ? 'repeated events' : ''; // cagar nisto em principio
    //schedule.state = chance.bool({likelihood: 20}) ? 'Free' : 'Busy'; // cagar nisto em principio
    //schedule.color = calendar.color;
    //schedule.bgColor = calendar.bgColor;
    //schedule.dragBgColor = calendar.dragBgColor;
    //schedule.borderColor = calendar.borderColor;

    // deve ser para cagar em principio
    /* if (schedule.category === 'milestone') {
        schedule.color = schedule.bgColor;
        schedule.bgColor = 'transparent';
        schedule.dragBgColor = 'transparent';
        schedule.borderColor = 'transparent';
    }
    // deve ser para cagar em principio
    schedule.raw.memo = chance.sentence();
    schedule.raw.creator.name = chance.name();
    schedule.raw.creator.avatar = chance.avatar();
    schedule.raw.creator.company = chance.company();
    schedule.raw.creator.email = chance.email();
    schedule.raw.creator.phone = chance.phone();
    

    if (chance.bool({ likelihood: 20 })) { // deve ser para cagar
        var travelTime = chance.minute();
        schedule.goingDuration = travelTime;
        schedule.comingDuration = travelTime;
    } */

  
}

function listSchedules(value ){
    var startDate;
    var endDate;
    var diffDate;
    var schedule = new ScheduleInfo();
   schedule.dueDateClas= '';
   if(value.sponsor==null){

   }else {
    schedule.state="Patrocinador: "+ value.sponsor.name;
   }
    schedule.id = String(value.idActivity);
    schedule.calendarId = String(value.activityType.idActivityType);
    schedule.title = value.title;
    schedule.isReadOnly=true;
    startDate=moment(value.init_data);
    endDate = moment(value.end_data);
   // endDate.add((0), 'days');
    diffDate = endDate.diff(startDate, 'days');
    //console.log(diffDate)
    schedule.isAllday =false; // nao sei o que faz
    schedule.category = 'time';

    startDate.add((1), 'days'); // deixar para ja
    //startDate.hours(chance.integer({min: 0, max: 23}))
    //startDate.minutes(chance.bool() ? 0 : 30);
    schedule.start =/* startDate.toDate();*/ startDate.toDate();
    schedule.end = endDate.toDate();  // data que acaba a atividade
    //console.log(schedule.start);
    schedule.goingDuration = chance.integer({min: 30, max: 120});
     schedule.comingDuration = chance.integer({min: 30, max: 120});;

    schedule.isPrivate = true;
    schedule.location = value.address;
    
    schedule.attendees = ["Instituição: "+  value.institution.name];
    schedule.recurrenceRule = value.status

    schedule.color = value.activityType.color;
    schedule.bgColor = value.activityType.color;
    schedule.dragBgColor = value.activityType.color;
    schedule.borderColor = value.activityType.color;

   if (schedule.category === 'milestone') {
    schedule.color = schedule.bgColor;
    schedule.bgColor = 'transparent';
    schedule.dragBgColor = 'transparent';
    schedule.borderColor = 'transparent';
}
// deve ser para cagar em principio
schedule.raw.memo = chance.sentence();
schedule.raw.creator.name = chance.name();
schedule.raw.creator.avatar = chance.avatar();
schedule.raw.creator.company = chance.company();
schedule.raw.creator.email = chance.email();
schedule.raw.creator.phone = chance.phone();


if (chance.bool({ likelihood: 20 })) { // deve ser para cagar
    var travelTime = chance.minute();
    schedule.goingDuration = travelTime;
    schedule.comingDuration = travelTime;
}
ScheduleList.push(schedule); // por na lista de aitividades
getTimeTemplate(schedule,true);

}

 async function setUpCalendar(/*viewName, renderStart, renderEnd*/) { // gerar o calendario todo
    ScheduleList = [];
   // console.log(CalendarList)
    CalendarList.forEach(function(calendar) { // quantidade do horarios randoms
       /* var i = 0, length = 10;
        if (viewName === 'month') {
            length = 3;
        } else if (viewName === 'day') {
            length = 4;
        }*/
       /* for (; i < length; i += 1) {
            generateRandomSchedule(calendar, renderStart, renderEnd);
        }*/
      
    });
    generateRandomSchedule(/*calendar/*, renderStart, renderEnd*/);
    
 }


  /**
     * Get time template for time and all-day
     * @param {Schedule} schedule - schedule
     * @param {boolean} isAllDay - isAllDay or hasMultiDates
     * @returns {string}
     */
   function getTimeTemplate(schedule, isAllDay) {
    var html = [];
    var start = moment(schedule.start.toUTCString());
    if (!isAllDay) {
        html.push('<strong>' + start.format('HH:mm') + '</strong> ');
    }
    if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(' Private');
    } else {
        if (schedule.isReadOnly) {
            html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule.recurrenceRule) {
            html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        } else if (schedule.attendees.length) {
            html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule.location) {
            html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }
        html.push(' ' + schedule.title);
    }
    return html.join('');
}
