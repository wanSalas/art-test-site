import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Download from "./pages/Download";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect}  from "react";
import Axios from 'axios';



function App() {

  const [logInProps, setLogInProps] = useState({token: "", user:""});


  //on first load of site, check jwt if session is still active
  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:8080'; 

  const checkSess = async () => {
    const { data } = await Axios.post(`${apiUrl}/auth/verifytoken`,{
      token: token
      });
      console.log("Token :", token);

    if(data.token){
      localStorage.setItem('token', data.token);
      console.log("newToken :", token);

      setLogInProps({user: data.user, token: data.token});
    }
      

    return {e: data.e, token: data.token, user: data.user};
  };

  useEffect(()=>{
    if(logInProps.token === ""){
      checkSess();
    }
  }, []) 
  

  return (
    <div className="App">

    <style>@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,800;1,700&display=swap');</style>

      

      <Router>
        <Navbar logInProps={logInProps} setLogInProps={p=>{setLogInProps(p)}} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/download" exact component={Download} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact render={(props) => (<Contact {...props} logInProps={logInProps} setLogInProps={p=>{setLogInProps(p)}}/>)} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
