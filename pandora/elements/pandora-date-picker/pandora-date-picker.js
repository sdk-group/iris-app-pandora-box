'use strict';

Polymer({
  is: 'pandora-date-picker',
  properties: {
    date: {
      type: String
    }
  },
  ready: function ready() {
    var weeksInMonth = moment(moment().endOf('month') - moment().startOf('month')).weeks();
    var daysInMonth = moment().daysInMonth();
    var offset = moment().date(1).weekday();

    var blank = _.fill(Array(offset), {});
    var weeks = [];
    weeks[0] = blank;
    for (var i = 1; i <= daysInMonth; i += 1) {}
    console.log(weeksInMonth);
    console.log(daysInMonth);
    console.log(offset);
  }
});