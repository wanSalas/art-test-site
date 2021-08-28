module.exports = function (app) {
  const email = app.handlers.email;

  app.post('/email/sendcontact',
    email.sendContact.sendContact);

}