import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import configurations from './configurations';
import ConnectSocket from './ConnectSocket';

const Login = (props) => {
  const [username,setUsername] = useState('');
  const [usernameError, setUsernameError] = useState();
  const [password,setPassword] = useState('');
  const [passwordError, setPasswordError] = useState();

  const history = useHistory();

  const loginValidation = () => {
    if (String(username).length < 5) {
      setUsernameError("username must be at least 5 ch long");
      return false;
    } else {
      setUsernameError("");
    }
    if (String(password).length < 8) {
      setPasswordError("password must be at least 8 ch long");
      return false;
    } else {
      setPasswordError("");
    }
  };

  const login = () => {
    let validRes = loginValidation();
    if (validRes === false) {
        console.log("not valid")
        return;
    }
    console.log("valid")
    axios.post(configurations.server + 'login', {
      username: username,
      password: password
    },{ withCredentials: true })
    .then(res => {
      if(res.data == true){
        history.push('/menu');
      }
    })
    .catch(err => console.log(err));
  }

  const changeUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
    console.log(username);
  }


    return (
        <div>
            <div>
                Username <input type="text" value={username} onChange={changeUsername}/>
            </div>
            <div>{usernameError}</div>
            <div>
                password <input type="text" value={password} onChange={changePassword}/>
            </div>
            <div>{passwordError}</div>
            <button onClick={login}>login</button>
        </div>
    );
}

export default Login;