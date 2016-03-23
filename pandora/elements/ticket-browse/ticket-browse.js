'use strict';

Polymer({
  is: 'ticket-browse',
  observers: ['updateTickets(dedicated_date)'],
  ready: function ready() {
    this.dedicated_date = "2016-03-24";
    this.view_visible = false;
  },
  updateTickets: function updateTickets(dedicated_date) {
    var _this = this;

    if (!this.$.pandora.self()) return;
    console.log('<browse-tickets> updating...');
    this.operators = [];
    this.view_visible = false;
    this.$.pandora.getPlacementSnapshot(dedicated_date).then(function (r) {
      _this.set('tickets', r);
      console.log('tickets rec', r);
      _this.operators = _.uniq(_.map(r, 'operator'));
    });
  },
  computeStyle: function computeStyle(ticket) {
    var width = ticket.time_description[1] - ticket.time_description[0];
    var absolute_width = width / (60 * 60 * 24) * 100;
    var left = ticket.time_description[0] / (60 * 60 * 24) * 100;
    return 'width:' + absolute_width + '%; left:' + left + '%;';
  },
  ticketsByOperator: function ticketsByOperator(oper_id) {
    return _.filter(this.tickets, function (t) {
      return t.operator == oper_id;
    });
  },
  ticketInfo: function ticketInfo(e) {
    this.view_visible = true;
    this.selected = e.model.ticket;
    app.$.toast.text = 'Выбран № ' + e.model.ticket.label;
    app.$.toast.show();
  }
});