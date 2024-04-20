import React ,{useState} from "react";
import Input from '@material-ui/core/Input';
import axios from "axios";
import MultiplePizzas from "../assets/aboutBG.png";
import "../styles/About.css";
import Button from '@material-ui/core/Button';

function About() {
  const [title, setTitle] = useState('');


  function handleSubmit(){
let data = JSON.stringify({
  "user_userID": "1",
  "title": title,
  "instruction": "Cook James",
  "ingredients": "raw james"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/api/recipe',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

  }

  return (
    <>
    <form>
      <Input name="title" value={title} ></Input>
      <Button type = "submit" onClick={handleSubmit}>  submit </Button>
    </form>
    </>
  );
}

export default About;
