(function (document) {
	'use strict';

	var app = document.querySelector('#app');

	// Sets app default base URL
	app.baseUrl = '';
	if (!localStorage.is_dev) { // if production
		app.baseUrl = '/production/pandora/';
	}

	app.displayInstalledToast = function () {
		// Check to make sure caching is actually enabled—it won't be in the dev environment.
		if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
			Polymer.dom(document).querySelector('#caching-complete').show();
		}
	};

	app.addEventListener('dom-change', function () {
		console.log('Our app is ready to rock!');
	});

	// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function () {
		// imports are loaded and elements have been registered
	});

	// Scroll page to top and expand header
	app.scrollPageToTop = function () {
		app.$.headerPanelMain.scrollToTop(true);
	};

	app.closeDrawer = function () {
		app.$.paperDrawerPanel.closeDrawer();
	};

	app.menuAction = function () {
		app.$.paperDrawerPanel.togglePanel();
	}

	app.test_tree = {
		ServiceGroup: {
			"@id": {},
			"@type": {},
			"items_per_page": {},
			"content": {},
			"label": {},
			"view_name": {}
		},
		Schedule: {
			"@id": {},
			"@type": {},
			"has_day": {},
			"has_time_description": {},
			"has_owner": {}
		}
	};

})(document);