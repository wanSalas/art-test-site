import React from "react";
import { useState, useEffect}  from "react";
import PizzaLeft from "../assets/contactBG.png";
import Axios from 'axios';
import "../styles/Contact.css";


let token = localStorage.getItem('token');
const apiUrl = 'http://localhost:5000'; 




function Contact(props) {

  
  const [isVerifying, setVerifying] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkSess = async () => {
    const { data } = await Axios.post(`${apiUrl}/verifytoken`,{
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

  //on open of contactform, check jwt if session is still active
  //following code is to make sure the verification only runs once upon mounting/remounting of the component
  //also ensures no verification request goes out in parallel
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


  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      {props.logInProps.token ? 
      <div className="rightSide">
        <h1 className="contactHeader"> Contact Us</h1>

        <form id="contact-form" >
          <label htmlFor="name">Full Name</label>
          <input name="name" disabled value={props.logInProps.user.name} type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" disabled value={props.logInProps.user.email} type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button> Send Message</button>
        </form>
      </div>
      :
      <div className="rightSide">
        <div className="restrictedHeader">
          <h2> Restricted </h2>
          <p> Please Login to send us a message.</p>
        </div>

      </div>
      }
    </div>
  );
}

export default Contact;
