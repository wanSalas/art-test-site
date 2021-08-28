module.exports = function (app) {
  const handlers = app.handlers;
  handlers.auth.api(app);
  handlers.email.api(app);
}