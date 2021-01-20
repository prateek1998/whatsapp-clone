import { Button } from "@material-ui/core";
import React from "react";
import './Login.css';
import {auth,provider} from './firebase'
import {actionTypes } from './reducer'
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    console.log("its working");
    auth.signInWithPopup(provider).then(function(result) {
     if(result)
     console.log(result);   
     dispatch({
       type:actionTypes.SET_USER,
       user:result.user,
     })
    })
    .catch(error =>alert(error))
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://freepngimg.com/save/19323-whatsapp-transparent/1012x1024"
          alt="whatsapp_logo"
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp Clone</h1>
        </div>
        <Button onClick={signIn}>Sign in using Google</Button>
      </div>
    </div>
  );
}

export default Login;
