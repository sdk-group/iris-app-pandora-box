'use strict';

window.addEventListener('WebComponentsReady', function () {

  // if (window.location.port === '') { // if production
  if (!localStorage.is_dev) {
    // if production
    page.base(app.baseUrl.replace(/\/$/, ''));
  }

  var settings = new IRIS.settings();

  function checkSettings(ctx, next) {
    var id = settings.getItem('pandora_arm_id');
    if (!id) {
      page.redirect('/settings');
      return;
    }
    next();
  }

  // Middleware
  function scrollToTop(ctx, next) {
    app.scrollPageToTop();
    next();
  }

  function closeDrawer(ctx, next) {
    app.closeDrawer();
    next();
  }

  function checkLogin(ctx, next) {
    var user = app.$.api.exposed.user;

    if (!user || !user.isLogged()) {
      app.$.toast.text = 'Требуется авторизация.';
      app.$.toast.show();
      page.redirect(app.baseUrl);
    }
    next();
  }

  function checkAfterLogin(ctx, next) {
    var user = app.$.api.exposed.user;

    if (user && user.isLogged()) {
      page.redirect('/ticket/browse');
      return;
    }
    next();
  }

  // Routes
  page('/restart', function () {
    app.restart_dialog = true;
    page.redirect('/');
    setTimeout(function () {
      window.location.reload();
    }, 300);
  });

  page('*', scrollToTop, closeDrawer, function (ctx, next) {
    next();
  });

  page('/', checkSettings, checkAfterLogin, function () {
    app.route = 'login';
  });

  page(app.baseUrl, checkSettings, checkAfterLogin, function () {
    app.route = 'login';
  });

  page('/ticket/browse', checkSettings, checkLogin, function () {
    app.route = 'ticket-browse';
  });

  page('/settings', function () {
    app.route = 'settings';
  });

  page('/history', checkLogin, function () {
    app.$['history-page'].redraw();
    app.route = 'history';
  });

  // 404
  page('*', function () {
    app.$.toast.text = 'Страница ' + window.location.href + 'не найдена.';
    app.$.toast.show();
    page.redirect(app.baseUrl);
  });

  // add #! before urls
  page({
    hashbang: true
  });
});