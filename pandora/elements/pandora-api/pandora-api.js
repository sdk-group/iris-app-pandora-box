'use strict';

(function (User, settings, History) {
  'use strict';

  var default_settings = [{
    name: 'API',
    items: {
      api_server: {
        element: 'input',
        label: 'Сервер',
        default: 'localhost'
      },
      api_port: {
        element: 'input',
        label: 'Порт',
        default: '9000'
      }
    }
  }, {
    name: 'АРМ',
    items: {
      "pandora-box_arm_id": {
        element: 'input',
        label: 'ID Рабочего места'
      }
    }
  }];
  var workstation_type = 'pandora-box';

  Polymer({
    is: 'pandora-api',
    ready: function ready() {
      var _this = this;

      console.log(_.capitalize(workstation_type) + ' API ready');

      var arm_settings = new settings();
      arm_settings.addDesc(default_settings);
      //@NOTE: could we put something more useful than localhost
      if (arm_settings.getDefaults('data_server') == 'localhost' && arm_settings.getItem('api_server')) arm_settings.setDefaults('data_server', arm_settings.getItem('api_server'));

      var arm_operator = new User(workstation_type);
      var arm_history = new History();

      this.exposed = {
        'user': arm_operator,
        'settings': arm_settings,
        'history': arm_history
      };

      _.forEach(this.exposed, function (module, name) {
        _this.$.api.expose(name, module);
      });
    }
  });
})(IRIS.User, IRIS.settings, IRIS.History, IRIS.ShortcutRegistry);