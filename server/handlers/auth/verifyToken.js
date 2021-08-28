const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET_KEY;
const session = require('../../models/session.js');

var verifyToken = (req, res) => {
  
  let jwtToken = req.body.token;


  //test
  // jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxMjQ3YjNiZmZkNDVhMmM4YzdkZTYwNCIsIm5hbWUiOiJhYWFhIiwidXNlcm5hbWUiOiJhYWFhIiwicGFzc3dvcmQiOiIkMmIkMTAkYVpSL0NGb2NOL0U1NHNNQUQuLnN3LkNFcHZTVzNZWXgvY004aElJQWRIcmJpU25kc2h0Qk8iLCJlbWFpbCI6ImFhYWEiLCJfX3YiOjB9LCJpYXQiOjE2Mjk4MTYyNzMsImV4cCI6MTYyOTgxOTg3M30.FdLhRdOHD3weyJDmxl_KjSXm3bYXUaRWremLmMa7NNQ';
  
  
  //compare with token in db

  let result = verToken(jwtToken).then(
    (data) => {
      // console.log('data');
      // console.log(data);
  
      if(data.e){
        res.send(data);
      }else{
        res.cookie('session-token', data.token, {httpOnly:true });
        res.send(data);
      }
    }
  );

  
  

};

const verToken = async (jwtToken) => {

  let result = await session.findOne({ jwt: jwtToken });
  let res = {};
  if(result){
    var decoded = jwt.verify(jwtToken, jwtKey);
    if(decoded){
      let now = new Date();
      now = parseInt(now.getTime() / 1000);

      
      console.log(result.exp);
      console.log(now);
      console.log(result.exp > now);

      if(result.exp > now){
        //refresh token
        let newTokenjwt = jwt.sign({ data: decoded.data }, jwtKey, { expiresIn: "1h"});

        result.jwt = newTokenjwt;
        result.iat = now;
        result.exp = now + 3600;
        result.user = decoded.data.username;
        result.save();


        res = {token: newTokenjwt, user: decoded.data, e: ""};
      }else{

        //session actually expired
        res = {e: 'Session expired. Please log in.'}; 
      }
    }
      

    return res;

  }else{
    //no session with specific jwt found
    res = {e: 'Session expired. Please log in.'}; 
    return res;
  }

  return next();
}

module.exports.verifyToken = verifyToken;