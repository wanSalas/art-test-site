const bcrypt = require('bcrypt');
const user = require('../../models/user.js');
require('dotenv').config();

const saltRounds = parseInt(process.env.BCRYPT_SALT);

var register = (req, res) => {

  // console.log(req.headers);
 

  //unwrapper to extract only relevant fields from an object
  let unwrap = ({name, username, password, email}) => ({name, username, password, email});

  const uModelObj = unwrap(req.body);
  
  //hash password, then add to model when done
  bcrypt.hash(uModelObj.password, saltRounds, function(err, hash) {
    if(err){console.log(err); return (undefined)};
    
    uModelObj.password = hash;

    let newUser = new user(uModelObj);
    

  
    newUser.save(
      (err) => {
        if (err) {
          res.send(err);
          return err;
        }

        res.send(uModelObj);
        return uModelObj;
      }
    );

  });

  return (undefined);

};


module.exports.register = register;