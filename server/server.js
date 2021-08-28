const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const glob = require('require-glob');
const handlers = glob.sync(['./handlers/**/*.js'])


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieparser());


const user = require('./models/user.js');
const session = require('./models/session.js');

const uri = process.env.ATLAS_URI;
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const jwtKey = process.env.JWT_SECRET_KEY;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once(
  'open',
  () => { 
    console.log("MongoDB connection established. ");

    //test mongoose syntax here


    // user.find({ username: "weqweweqeq" }, (err, users) => { 
    //   if (err) return console.error(err);
    //   console.log(users);
    // });

 }
);

app.handlers = handlers;

app.use((req, res, next) => {

  req.handlers = handlers;

  return next();
});

handlers.api(app);

// app.post('/register', (req, res) => {

//   console.log(req.headers);
 

//   //unwrapper to extract only relevant fields from an object
//   let unwrap = ({name, username, password, email}) => ({name, username, password, email});

//   const uModelObj = unwrap(req.body);
  
//   //hash password, then add to model when done
//   bcrypt.hash(uModelObj.password, saltRounds, function(err, hash) {
//     if(err){console.log(err)};
    
//     uModelObj.password = hash;

//     let newUser = new user(uModelObj);
    

  
//     newUser.save(
//       (err) => {
//         if (err) {
//           res.send(err);
//         }

//         res.send(uModelObj);
//       }
//     );

//   });

  

  

// });

// app.post('/login', (req, res) => {

//   let unwrap = ({ username, password}) => ({username, password});

  
//   const loginCreds = unwrap(req.body);

//   // console.log(req.headers);
  
//   //test line
//   // const loginCreds = {username : 'testusername', password: 'pass'};

  
//   //get user info via uname, compare on callback
//   user.findOne({ username: loginCreds.username }, (err, user) => { 
//     if (err) return console.error(err);
//     // console.log(user);
//     if(user){
//       comparePass(loginCreds.password, user);
//     }else{
//       res.send({e:'no user with that username'});
//     }
    
//   });

//   //compare callback, return jwt as response and save jwt to db on callback
//   var comparePass = (pass, user) => {
//     bcrypt.compare(pass, user.password, function(err, result) {
//       // console.log(pass);
//       // console.log(user.password);
//       if(err)
//         console.log( err );

//       if(result){
//         let token = createJWT(user);

//         //currently unused
//         res.cookie('session-token', token, {httpOnly:true });

//         res.send({token:token, user: user});
//       }else{
//         res.send({e: "wrong password"});
//       }
      
      
//     });
//   };

//   var createJWT = (user) => {
//     let token = "";

//     delete user.password;


//     token = jwt.sign({ data: user }, jwtKey, { expiresIn: "1h"});

//     let now = new Date();

//     now = parseInt(now.getTime() / 1000);

//     let tokenobj = {jwt: token, iat: now, exp: now + 3600, user: user.username};

//     //search for existing session for user before creating new session
//     session.findOne({ user: user.username }, (err, dbtoken) => {
//       if (err) return console.error(err);

//       if(dbtoken){
//         dbtoken.jwt = token;
//         dbtoken.iat = now;
//         dbtoken.exp = now + 3600;
//         dbtoken.save();
//       }else{
//         //no existing token found. create new
//         let newToken = new session(tokenobj);

//         newToken.save();
//       }
//     });


//     return token;
//   }

 
// });

// app.post('/verifytoken', (req, res) => {
  
//   let jwtToken = req.body.token;


//   //test
//   // jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxMjQ3YjNiZmZkNDVhMmM4YzdkZTYwNCIsIm5hbWUiOiJhYWFhIiwidXNlcm5hbWUiOiJhYWFhIiwicGFzc3dvcmQiOiIkMmIkMTAkYVpSL0NGb2NOL0U1NHNNQUQuLnN3LkNFcHZTVzNZWXgvY004aElJQWRIcmJpU25kc2h0Qk8iLCJlbWFpbCI6ImFhYWEiLCJfX3YiOjB9LCJpYXQiOjE2Mjk4MTYyNzMsImV4cCI6MTYyOTgxOTg3M30.FdLhRdOHD3weyJDmxl_KjSXm3bYXUaRWremLmMa7NNQ';
  
  
//   //compare with token in db

//   let result = verifyToken(jwtToken).then(
//     (data) => {
//       // console.log('data');
//       // console.log(data);
  
//       if(data.e){
//         res.send(data);
//       }else{
//         res.cookie('session-token', data.token, {httpOnly:true });
//         res.send(data);
//       }
//     }
//   );

  
  

// });

// const verifyToken = async (jwtToken) => {

//   let result = await session.findOne({ jwt: jwtToken });
//   let res = {};
//   if(result){
//     var decoded = jwt.verify(jwtToken, jwtKey);
//     if(decoded){
//       let now = new Date();
//       now = parseInt(now.getTime() / 1000);

      
//       console.log(result.exp);
//       console.log(now);
//       console.log(result.exp > now);

//       if(result.exp > now){
//         //refresh token
//         let newTokenjwt = jwt.sign({ data: decoded.data }, jwtKey, { expiresIn: "1h"});

//         result.jwt = newTokenjwt;
//         result.iat = now;
//         result.exp = now + 3600;
//         result.user = decoded.data.username;
//         result.save();


//         res = {token: newTokenjwt, user: decoded.data, e: ""};
//       }else{

//         //session actually expired
//         res = {e: 'Session expired. Please log in.'}; 
//       }
//     }
      

//     return res;

//   }else{
//     //no session with specific jwt found
//     res = {e: 'Session expired. Please log in.'}; 
//     return res;
//   }


// }


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})