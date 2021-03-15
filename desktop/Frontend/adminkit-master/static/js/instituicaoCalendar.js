import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
$(document).ready(function() {
    
var calendar = new Calendar('#calendar', {
    defaultView: 'month',
    taskView: true,
    template: {
      monthDayname: function(dayname) {
        return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
      }
    }
  });

  calendar.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-01-18T22:30:00+09:00',
        end: '2018-01-19T02:30:00+09:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-01-18T17:30:00+09:00',
        end: '2018-01-19T17:31:00+09:00',
        isReadOnly: true    // schedule is read-only
    }
]);
});

calendar.updateSchedule(schedule.id, schedule.calendarId, {
    start: startTime,
    end: endTime
});

calendar.deleteSchedule(schedule.id, schedule.calendarId);

calendar.on('beforeCreateSchedule', function(event) {
    var startTime = event.start;
    var endTime = event.end;
    var isAllDay = event.isAllDay;
    var guide = event.guide;
    var triggerEventName = event.triggerEventName;
    var schedule;

    if (triggerEventName === 'click') {
        // open writing simple schedule popup
        //schedule = {...};
    } else if (triggerEventName === 'dblclick') {
        // open writing detail schedule popup
        //schedule = {...};
    }

    calendar.createSchedules([schedule]);
});