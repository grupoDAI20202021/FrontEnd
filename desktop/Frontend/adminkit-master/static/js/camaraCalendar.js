const url = "http://127.0.0.1:8080";

let SponsorList = [];
let SponsorListId = [];

'use strict';

/* eslint-disable */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

(function(window, Calendar) {
    var cal, resizeThrottled;
    var useCreationPopup = false;
    var useDetailPopup = true;
    var datePicker, selectedCalendar;

    cal = new Calendar('#calendar', {
        defaultView: 'month',
        useCreationPopup: useCreationPopup,
        useDetailPopup: useDetailPopup,
        calendars: CalendarList,
        template: {
            milestone: function(schedule) {
                return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
            },
            milestoneTitle: function() {
                return 'Milestone';
            },
            task: function(schedule) {
                return '&nbsp;&nbsp;#' + schedule.title;
            },
            allday: function(schedule) {
                return getTimeTemplate(schedule, true);
            },
            time: function(schedule) {
                return getTimeTemplate(schedule, true);
            }
        }
    });

    // event handlers
    cal.on({
        'clickMore': function(e) {
            console.log('clickMore', e);
        },
        'clickSchedule': function(e) {
            setTimeout(function(){
            if (e.schedule.recurrenceRule == "Por aprovar") {

                Swal.fire({
                    title: 'Deseja aprovar ou cancelar a atividade ' + e.schedule.title + "?",
                    input: 'select',
                    inputOptions:   SponsorList
                    ,
                    inputPlaceholder: 'Selecione um patrocinador',
                    showCloseButton: true,
                    showDenyButton: true,
                    confirmButtonText: ' Aprovar',
                    denyButtonText: 'Eliminar',
                    inputValidator: (value) => {
                        
                        return new Promise((resolve) => {
                            console.log(value)
                            if (value == '') {
                                resolve("Selecione um patrocinador")
                            } else {
                                let data={};

                                for(let i=0; i< SponsorList.length; i++){
                                    if(value==i){
                                        data.idSponsor = SponsorListId[i];
                                        console.log(SponsorListId[i])
                                    }
                                }
                                fetch('http://127.0.0.1:8080/api/activities/'+e.schedule.id+'/sponsor', {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    method: 'PUT',
                                    body: JSON.stringify(data),
                                    credentials: 'include'
                                }).then(function(response) {
                                    if (!response.ok) {
                                        console.log(response.status); //=> number 100–599
                                        console.log(response.statusText); //=> String
                                        console.log(response.headers); //=> Headers
                                        console.log(response.url); //=> String
                                    } else {
                                        //setSchedules();
                                        cal.clear();
                                        generateRandomSchedule(/*calendar, renderStart, renderEnd*/)
                                        
        //generateSchedule(cal.getViewName(), cal.getDateRangeStart(), cal.getDateRangeEnd());
                                        Swal.close();
                                    }
                                }).then(function(result) {
                                    console.log(result);
                                }).catch(function(err) {
                                    alert("Submission error");
                                    console.error(err);
                                });
                            }
                        })
                    }
                }).then((result) => {

                     if (result.isDenied) {

                        fetch(url + '/api/activities/'+e.schedule.id, {
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            method: 'DELETE',
                        }).then(function(response) {
                            if (!response.ok) {
                                console.log(response.status); //=> number 100–599
                                console.log(response.statusText); //=> String
                                console.log(response.headers); //=> Headers
                                console.log(response.url); //=> String
                            }
                            else {
                                cal.clear();
                                        generateRandomSchedule(/*calendar, renderStart, renderEnd*/)
                             
                              swal({
                                title: "A atividade foi removida com sucesso!",
                                icon: "success",
                              });
                                  }
                                
                        }).then(function(result) {
                            console.log(result);
                        }).catch(function(err) {
                            console.error(err);
                        });

                    }
                })
            }
            }, 5000);
            
            console.log('clickSchedule', e.schedule);
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
            console.log('beforeCreateSchedule', e);
            saveNewSchedule(e);
        },
        'beforeUpdateSchedule': function(e) {
            var schedule = e.schedule;
            var changes = e.changes;

            console.log('beforeUpdateSchedule', e);

            if (changes && !changes.isAllDay && schedule.category === 'allday') {
                changes.category = 'time';
            }

            cal.updateSchedule(schedule.id, schedule.calendarId, changes);
            refreshScheduleVisibility();
        },
        'beforeDeleteSchedule': function(e) {
            console.log('beforeDeleteSchedule', e);
            cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
        },
        'afterRenderSchedule': function(e) {
            var schedule = e.schedule;
            var element = cal.getElement(schedule.id, schedule.calendarId);
            getTimeTemplate(schedule, false)
            console.log('afterRenderSchedule', e.schedule);
        },
        'clickTimezonesCollapseBtn': function(timezonesCollapsed) {
            console.log('timezonesCollapsed', timezonesCollapsed);

            if (timezonesCollapsed) {
                cal.setTheme({
                    'week.daygridLeft.width': '77px',
                    'week.timegridLeft.width': '77px'
                });
            } else {
                cal.setTheme({
                    'week.daygridLeft.width': '60px',
                    'week.timegridLeft.width': '60px'
                });
            }

            return true;
        }
    });
    document.getElementById("userEmail").innerHTML = localStorage.getItem("EmailLogado");
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
        if (schedule.recurrenceRule == "Aprovada" || schedule.recurrenceRule == "Finalizada") {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(' ' + schedule.start.toDate().toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute: '2-digit'
            }) + " " + schedule.title);
        } else {
            if (schedule.isReadOnly) {
                // html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            // console.log(schedule.start)
            html.push(' ' + schedule.start.toDate().toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute: '2-digit'
            }) + " " + schedule.title);
        }

        return html.join('');
    }

    /**
     * A listener for click the menu
     * @param {Event} e - click event
     */
    function onClickMenu(e) {
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var action = getDataAction(target);
        var options = cal.getOptions();
        var viewName = '';

        console.log(target);
        console.log(action);
        switch (action) {
            case 'toggle-daily':
                viewName = 'day';
                break;
            case 'toggle-weekly':
                viewName = 'week';
                break;
            case 'toggle-monthly':
                options.month.visibleWeeksCount = 0;
                viewName = 'month';
                break;
            case 'toggle-weeks2':
                options.month.visibleWeeksCount = 2;
                viewName = 'month';
                break;
            case 'toggle-weeks3':
                options.month.visibleWeeksCount = 3;
                viewName = 'month';
                break;
            case 'toggle-narrow-weekend':
                options.month.narrowWeekend = !options.month.narrowWeekend;
                options.week.narrowWeekend = !options.week.narrowWeekend;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.narrowWeekend;
                break;
            case 'toggle-start-day-1':
                options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
                options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.startDayOfWeek;
                break;
            case 'toggle-workweek':
                options.month.workweek = !options.month.workweek;
                options.week.workweek = !options.week.workweek;
                viewName = cal.getViewName();

                target.querySelector('input').checked = !options.month.workweek;
                break;
            default:
                break;
        }

        cal.setOptions(options, true);
        cal.changeView(viewName, true);

        setDropdownCalendarType();
        setRenderRangeText();
        setSchedules();
    }

    function onClickNavi(e) {
        var action = getDataAction(e.target);

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            default:
                return;
        }

        setRenderRangeText();
        setSchedules();
    }

    function onNewSchedule() { //nao sei
        var title = $('#new-schedule-title').val();
        var location = $('#new-schedule-location').val();
        var isAllDay = document.getElementById('new-schedule-allday').checked;
        var start = datePicker.getStartDate();
        var end = datePicker.getEndDate();
        var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];
        if (!title) {
            return;
        }

        cal.createSchedules([{
            id: String(chance.guid()),
            calendarId: calendar.id,
            title: title,
            isAllDay: isAllDay,
            start: start,
            end: end,
            category: isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            raw: {
                location: location
            },
            state: 'Busy'
        }]);

        $('#modal-new-schedule').modal('hide');
    }

    function onChangeNewScheduleCalendar(e) { // nao sei
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var calendarId = getDataAction(target);
        changeNewScheduleCalendar(calendarId);

    }

    function changeNewScheduleCalendar(calendarId) {
        var calendarNameElement = document.getElementById('calendarName');
        var calendar = findCalendar(calendarId);
        var html = [];

        html.push('<span class="calendar-bar"  style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
        html.push('<span class="calendar-name">' + calendar.name + '</span>');

        calendarNameElement.innerHTML = html.join('');

        selectedCalendar = calendar;
    }

    function createNewSchedule(event) { // ao clicar no botao criar atividade
        var start = event.start ? new Date(event.start.getTime()) : new Date();
        var end = event.end ? new Date(event.end.getTime()) : moment().add(1, 'hours').toDate();

        if (useCreationPopup) {
            cal.openCreationPopup({
                start: start,
                end: end
            });
        }
    }

    function saveNewSchedule(scheduleData) { // criar atividade
        var calendar = scheduleData.calendar || findCalendar(scheduleData.calendarId);
        var schedule = {
            id: String(chance.guid()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            location: scheduleData.location,
            raw: {
                class: scheduleData.raw['class']
            },
            state: scheduleData.state
        };
        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.borderColor = calendar.borderColor;
        }

        cal.createSchedules([schedule]);

        refreshScheduleVisibility();
    }

    function onChangeCalendars(e) { // clicar no botao "view all"
        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;

        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function(input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            CalendarList.forEach(function(calendar) {
                calendar.checked = checked;
            });
        } else {
            findCalendar(calendarId).checked = checked;

            allCheckedCalendars = calendarElements.every(function(input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        refreshScheduleVisibility();
    }

    function refreshScheduleVisibility() { // ao mudar o range do tipo de atividades no calendario
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render(true);

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }

    function setDropdownCalendarType() { // menu dropdown que muda o alcance do calendario- exemplo mes para semana
        var calendarTypeName = document.getElementById('calendarTypeName');
        var calendarTypeIcon = document.getElementById('calendarTypeIcon');
        var options = cal.getOptions();
        var type = cal.getViewName();
        var iconClassName;

        if (type === 'day') {
            type = 'Dia';
            iconClassName = 'calendar-icon ic_view_day';
        } else if (type === 'week') {
            type = 'Semana';
            iconClassName = 'calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 2) {
            type = '2 semanas';
            iconClassName = 'calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 3) {
            type = '3 semanas';
            iconClassName = 'calendar-icon ic_view_week';
        } else {
            type = 'Mês';
            iconClassName = 'calendar-icon ic_view_month';
        }

        calendarTypeName.innerHTML = type;
        calendarTypeIcon.className = iconClassName;
    }

    function currentCalendarDate(format) { // nao sei
        var currentDate = moment([cal.getDate().getFullYear(), cal.getDate().getMonth(), cal.getDate().getDate()]);

        return currentDate.format(format);
    }

    function setRenderRangeText() { // nao sei
        var renderRange = document.getElementById('renderRange');
        var options = cal.getOptions();
        var viewName = cal.getViewName();

        var html = [];
        if (viewName === 'day') {
            html.push(currentCalendarDate('YYYY.MM.DD'));
        } else if (viewName === 'month' &&
            (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
            html.push(currentCalendarDate('YYYY.MM'));
        } else {
            html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
            html.push(' ~ ');
            html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
        }
        renderRange.innerHTML = html.join('');
    }

    function setSchedules() { // aparecer as atividades no calendario
        cal.clear();
        //generateSchedule(cal.getViewName(), cal.getDateRangeStart(), cal.getDateRangeEnd());
        cal.createSchedules(ScheduleList);
        for (let i = 0; ScheduleList.length; i++) {
            getTimeTemplate(ScheduleList[i], ScheduleList.isAllDay)
        }

        refreshScheduleVisibility();
    }

    function setEventListener() { // dar funçoes aos butoes
        $('#menu-navi').on('click', onClickNavi);
        $('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
        $('#lnb-calendars').on('change', onChangeCalendars); // CLICAR NOS TIPOS DE ATIVIDADE

        $('#btn-save-schedule').on('click', onNewSchedule);
        $('#btn-new-schedule').on('click', createNewSchedule); // BOTAO CRIAR

        $('#dropdownMenu-calendars-list').on('click', onChangeNewScheduleCalendar);

        window.addEventListener('resize', resizeThrottled);
    }

    function getDataAction(target) { // mover as datas do calendario

        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    resizeThrottled = tui.util.throttle(function() {
        cal.render();
    }, 50);

    window.cal = cal;

    setDropdownCalendarType();
    setRenderRangeText();
    setSchedules();
    setEventListener();
})(window, tui.Calendar);


let activityType;
// set calendars
(function() {

    setUpActivityType();

    async function setUpActivityType() {

        const res = await fetch(url + '/api/activitiestype', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        activityType = await res.json();

        var calendarList = document.getElementById('calendarList');
        var html = [];
        CalendarList.forEach(function(calendar) { // colocar as atividade no menu de lado
            html.push('<div class="lnb-calendars-item"><label style="width:max-content">' +
                '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
                '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
                '<span>' + calendar.name + '</span>' +
                '</label></div>'
            );
        });
        calendarList.innerHTML = html.join('\n');

        fetch('http://127.0.0.1:8080/api/townhalls/' + localStorage.getItem("userLogado") + '/sponsors',{
            credentials: 'include'
        })
            .then(res => res.json())
            .then((out) => {
                $.each(out, function(index, value) {
                    console.log(value)
                    if(value.active==1){
                    SponsorList.push(value.name);
                    SponsorListId.push(value.idSponsor)
                    }
                });
            }).catch(err => console.error(err))

        console.log(SponsorList);

    }
})();