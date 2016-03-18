'use strict';

Polymer({
  is: 'pandora-date-picker',
  properties: {
    date: {
      type: String,
      value: function value() {
        return moment().format();
      }
    },
    selected: {
      type: String,
      notify: true
    }
  },
  toMonth: function toMonth(date) {
    return moment(date).format('MMMM');
  },
  toYear: function toYear(date) {
    return moment(date).format('YY');
  },
  ready: function ready() {
    var m = moment(this.date);
    var daysInMonth = m.daysInMonth();
    var offset = m.date(1).weekday();

    var month = _.chunk(_.concat(_.fill(Array(offset), {
      blank: true
    }), _.map(_.range(1, daysInMonth + 1), function (d) {
      return {
        label: d,
        date: m.date(d).format('YYYY-MM-DD')
      };
    })), 7);

    this.set('month', month);
  },
  daySelected: function daySelected(e) {
    console.log(e);
    var day = e.model.day;
    this.set('selected', day.date);
    this.fire('date-selected', day);
  }
});