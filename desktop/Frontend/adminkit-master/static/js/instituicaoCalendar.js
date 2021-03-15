var Calendar = require('tui-calendar'); /* CommonJS */
require("tui-calendar/dist/tui-calendar.css");

// If you use the default popups, use this.
require("tui-date-picker/dist/tui-date-picker.css");
require("tui-time-picker/dist/tui-time-picker.css");
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