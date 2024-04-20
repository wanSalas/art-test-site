import React from "react";
import { useState, useEffect}  from "react";
import PizzaLeft from "../assets/contactBG.png";
import Axios from 'axios';
import "../styles/Contact.css";


let token = localStorage.getItem('token');
const apiUrl = 'http://localhost:8080'; 




function Contact(props) {

  
  const [isVerifying, setVerifying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const [contactFormData, setContactFormData] = useState({name: '', email: '', message:''});

  const checkSess = async () => {
    const { data } = await Axios.post(`${apiUrl}/auth/verifytoken`,{
      token: token
      });
      
    console.log(data);
    if(data.e){
      props.setLogInProps({user: '', token: ''});
      setVerifying(false);
    }else{
      localStorage.setItem('token', data.token);

      props.setLogInProps({user: data.user, token: data.token});
      setVerifying(false);
    }

    return {e: data.e, token: data.token, user: data.user};
  };
  useEffect(()=>{
    if(!mounted){
      setMounted(true);
      if(props.logInProps.token !== "" && !isVerifying){
        setVerifying(true);
        
        console.log(token);
        token = localStorage.getItem('token');
        checkSess();
      }
    }
  }, []);

  const onChangeMessage = (event) => {
    setContactFormData({name: props.logInProps.user.name, email: props.logInProps.user.email ,message: event.target.value});

    console.log(contactFormData);
  };

  const submitContactMail = (event) => {
    Axios.post(`${apiUrl}/email/sendcontact`, {
      name: contactFormData.name,
      email: contactFormData.email,
      message: contactFormData.message
    }).then((response) => {
      console.log(response);
      setSentMessage(true);
    });
    event.preventDefault();


  };


  return (
    <div className="contact">
      <div
        className="left-side"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      {props.logInProps.token ? 

        <div className="right-side">

        {sentMessage ?

          <div>

            <div className="restricted-header">
              <h2> Message Sent! </h2>
              <p> Thank you very much! We will be contacting you soon.</p>
            </div>

          </div>

          :

          <div>
            <h1 className="contact-header"> Contact Us</h1>

            <form id="contact-form" onSubmit={submitContactMail}>
              <label htmlFor="name">Email of Friend</label>
              <input name="name" disabled value={props.logInProps.user.name} type="text" />
              <label htmlFor="email">Email</label>
              <input name="email" disabled value={props.logInProps.user.email} type="email" />
              <label htmlFor="message">Message</label>
              <textarea
                rows="6"
                placeholder="Enter message..."
                name="message"
                required
                onChange={onChangeMessage}
              ></textarea>
              <button> Send Message</button>
            </form>
          </div>
        }

        </div>

        :

        <div className="right-side">
          <div className="restricted-header">
            <h2> Restricted </h2>
            <p> Please Login to send us a message.</p>
          </div>

        </div>
      }
    </div>
  );
}

export default Contact;
