module.exports = function (app) {
  const auth = app.handlers.auth;

  // console.log(auth.register);
  app.post('/auth/register',
    auth.register.register);

  app.post('/auth/login',
    auth.login.login);

  app.post('/auth/verifytoken',
    auth.verifyToken.verifyToken);
}