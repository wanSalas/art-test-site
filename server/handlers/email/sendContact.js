const mail = require('../../models/contactMail.js');

const sendContact = (req, res, next) => {

  let unwrap = ({ name, email, message}) => ({name, email, message});

  
  const messageDetails = unwrap(req.body);
  

  let newMail = new mail(messageDetails);
  


  newMail.save(
    (err) => {
      if (err) {
        res.send(err);
        return err;
      }

      res.send(messageDetails);
      return messageDetails;
    }
  );

}


module.exports.sendContact = sendContact;