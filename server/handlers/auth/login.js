const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../../models/user.js');
const session = require('../../models/session.js');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET_KEY;
console.log(jwtKey);


const login = (req, res, next) => {

  let unwrap = ({ username, password}) => ({username, password});

  
  const loginCreds = unwrap(req.body);

  // console.log(req.headers);
    
  
  //test line
  // const loginCreds = {username : 'testusername', password: 'pass'};

  
  var comparePass = (pass, user) => {
    bcrypt.compare(pass, user.password, function(err, result) {
      // console.log(pass);
      // console.log(user.password);
      if(err){
        // console.log( err );
        return err;
      }
  
      if(result){
        let token = createJWT(user);
  
        //currently unused
        res.cookie('session-token', token, {httpOnly:true });
  
        res.send({token:token, user: user});
        return ({token:token, user: user});
      }else{
        res.send({e: "wrong password"});
        return ({e: "wrong password"});
      }
      
      
    });
  };
  
  var createJWT = (user) => {
    let token = "";
  
    delete user.password;
  
  
    token = jwt.sign({ data: user }, jwtKey, { expiresIn: "1h"});
  
    let now = new Date();
  
    now = parseInt(now.getTime() / 1000);
  
    let tokenobj = {jwt: token, iat: now, exp: now + 3600, user: user.username};
  
    //search for existing session for user before creating new session
    session.findOne({ user: user.username }, (err, dbtoken) => {
      // if (err) return console.error(err);
  
      if(dbtoken){
        dbtoken.jwt = token;
        dbtoken.iat = now;
        dbtoken.exp = now + 3600;
        dbtoken.save();
      }else{
        //no existing token found. create new
        let newToken = new session(tokenobj);
  
        newToken.save();
      }
    });
  
  
    return token;
  }

  //get user info via uname, compare on callback
  return user.findOne({ username: loginCreds.username }).then((user) => { 
    console.log('passed1');
    if(user){
      console.log('passed2');
      return comparePass(loginCreds.password, user);
    }else{
      
      console.log('passed3');
      res.send({e:'no user with that username'});
      return {e:'no user with that username'};
    }
    
  }).catch((err) => {
    console.log(err);
  });

  //compare callback, return jwt as response and save jwt to db on callback
  
};



module.exports.login = login;