import React, { useState } from "react";
import Logo from "../assets/AoTzuMinLogoGreen.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';


import "../styles/Navbar.css";

const apiUrl = 'http://localhost:8080'; 
Axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function Navbar(props) {
  const [anchorProfMenu, setAnchorProfMenu] = React.useState(null);
  const [anchorNav, setAnchorNav] = React.useState(null);
  const [loggingIn, setLoggingIn] = React.useState(false);
  const openProfMenu = Boolean(anchorProfMenu);
  const openNav = Boolean(anchorNav);

  const handleProfMenu = (event) => {
    setAnchorProfMenu(event.currentTarget);
  };

  const handleProfMenuClose = () => {
    setAnchorProfMenu(null);
  };

  const handleNav = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleNavClose = () => {
    setAnchorNav(null);
  };

  const [open, setOpen] = React.useState(false);

  const [loguname, setloguname] = React.useState('');
  const [logpassword, setlogpassword] = React.useState('');

  const [regname, setregname] = React.useState('');
  const [reguname, setreguname] = React.useState('');
  const [regpassword, setregpassword] = React.useState('');
  const [regemail, setregemail] = React.useState('');

  const handleOpenLoginModal = () => {
    setOpen(true);
    setLoggingIn(true);
  };

  const handleOpenRegModal = () => {
    setOpen(true);
    setLoggingIn(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const login = async () => {
    const { data } = await Axios.post(`${apiUrl}/auth/login`,{
      username: loguname,
      password: logpassword,
      });
      

    if(data.token){
      console.log(data);
      localStorage.setItem('token', data.token);

      props.setLogInProps({user: data.user, token: data.token});
    }

    return {e: data.e, token: data.token, user: data.user};
  };

  const refreshfields = () => {
    setloguname("");
    setlogpassword("");
    setreguname("");
    setregpassword("");
    setregname("");
    setregemail("");
  }

  const handleLogin = () => {

    // Axios.post("http://localhost:8080/auth/login", {
    //   username: loguname,
    //   password: logpassword,
    //   }
    // ).then((response) => {
    //   console.log(response.data);
    //   if(response.data.e){
    //     alert(response.data.e);
    //   }
    //   if(response.data){
  
    //   }
    // });
    login().then((ret)=>{
      if(ret.token){ 
        setAnchorProfMenu(null);
        setOpen(false);
        refreshfields();
        localStorage.setItem("token", ret.token);
        console.log("USER LOGGED IN")
      }else{
        // when it fails to log in
        alert(ret.e);
      }
    });

  };

  const handleRegister = () => {
    //setAnchorProfMenu(null);
    //setOpen(false);
    Axios.post(`${apiUrl}/auth/register`, {
        name: regname,
        username: reguname,
        password: regpassword,
        email: regemail
      }
    ).then((response) => {
      setLoggingIn(true);
    });
    
    refreshfields();

    //props.setLogInProps( {user: ret.user, token: ret.token} );
  };

  const handleLogout = () => {
    setAnchorProfMenu(null);
    setOpen(false);
    localStorage.setItem('token', '');
    console.log("user logged out");
    props.setLogInProps( {token: "", user:""} );
  };

  return (
    <div className="navbar">
      <div className="left-side" >
        <Link to="/"> <img src={Logo} /> </Link>
      </div>
      <div className="right-side">
        <Link to="/"> Home </Link>
        <Link to="/download"> Downloads </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
    
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorProfMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openProfMenu}
            onClose={handleProfMenuClose}
          >
            { props.logInProps.token ? 
              <div>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
                <MenuItem onClick={handleProfMenuClose}>Profile</MenuItem>
              </div>
              :
              <div> 
              <MenuItem onClick={handleOpenLoginModal}>Log in</MenuItem>
              <MenuItem onClick={handleOpenRegModal}>Register</MenuItem>
              </div>
            }
          </Menu>
          
        </div>
        <div>
          <button 
            aria-controls="menu-appnav"
            aria-haspopup="true" 
            className="drop-menu" 
            onClick={handleNav}
          >
            <ReorderIcon />
          </button>
          <Menu
              id="menu-navbar"
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openNav}
              onClose={handleNavClose}
            >
              <MenuItem onClick={handleNavClose} component={Link} to="/">Home</MenuItem>
              <MenuItem onClick={handleNavClose} component={Link} to="/download">Downloads</MenuItem>
              <MenuItem onClick={handleNavClose} component={Link} to="/about">About</MenuItem>
              <MenuItem onClick={handleNavClose} component={Link} to="/contact">Contact</MenuItem>
            </Menu>
          </div>
      </div>

      <Modal  
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        className="modal"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='modal-content'>
            
            <h2 id="transition-modal-title">{loggingIn ? 'Log in to ArconOS' : 'Create new Account'}</h2>
            {/* show reg if register button is pressed */}
            {loggingIn ? 
            <form className='modal-form' noValidate autoComplete="off">
              <TextField 
                className="modal-field" 
                id="loguname" 
                value={loguname} 
                onChange={(e) => {setloguname(e.target.value)}}  
                label="Username" 
                variant="outlined" 
              />
              <TextField 
                className="modal-field" 
                id="logpass" 
                value={logpassword} 
                onChange={(e) => {setlogpassword(e.target.value)}}  
                label="Password"
                variant="outlined" 
                type="password" 
              />

              <Button variant="contained" onClick={handleLogin} color="primary">
                LOG IN
              </Button>
            </form>
            :
            <form className='modal-form' noValidate autoComplete="off" action="">
              <TextField 
                className="modal-field" 
                id="regname" 
                value={regname} 
                onChange={(e) => {setregname(e.target.value)}} 
                label="Name" 
                variant="outlined"  
              />
              <TextField 
                className="modal-field" 
                id="regemail" 
                value={regemail} 
                onChange={(e) => {setregemail(e.target.value)}} 
                label="Email" 
                variant="outlined" 
              />
              <TextField 
                className="modal-field" 
                id="reguname" 
                value={reguname} 
                onChange={(e) => {setreguname(e.target.value)}} 
                label="Username" 
                variant="outlined" 
              />
              <TextField 
                className="modal-field" 
                id="regpass" 
                value={regpassword} 
                onChange={(e) => {setregpassword(e.target.value)}} 
                label="Password" 
                variant="outlined" 
                type="password" 
              />

              <Button variant="contained" onClick={handleRegister} color="primary">
                REGISTER
              </Button>
            </form>
            }
          </div>
        </Fade>
      </Modal>
      
    </div>

    
  );
}

export default Navbar;
