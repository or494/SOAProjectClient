import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import configurations from './configurations';
import ConnectSocket from './ConnectSocket';

function Register(props) {
    const [username, setUsername] = useState();
    const [usernameError, setUsernameError] = useState();
    const [email, setEmail] = useState();
    const [emailError, setEmailError] =useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const history = useHistory();
    const validEmail = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const registerValidation = () => {
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

        if (!validEmail.test(email)) {
            setEmailError("email not valid");
            return false;
        }
        else {
            setEmailError("");
        }

    };

    const register = () => {
        let validRes = registerValidation();
        if (validRes === false) {
            console.log("not valid")
            return;
        }
        console.log("valid")
        axios.post(configurations.server + 'register', {
            username: username,
            email: email,
            password: password
        }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if(res.data == true){
                    history.push('/menu');
                }
            })
            .catch(err => console.log(err));
        }
    
        return (
            <div>
                <div>
                    username <input type="text" placeholder="username" value={username} onChange={changeUsername}></input>
                </div>
                <div>{usernameError}</div>
                <div>
                    email <input type="text" placeholder="email" value={email} onChange={changeEmail}></input>
                </div>
                <div>{emailError}</div>
                <div>
                    password <input type="password" placeholder="password" value={password} onChange={changePassword}></input>
                </div>
                <div>{passwordError}</div>
                <button onClick={register}>register</button>
            </div>
        );
    }
    
    export default Register;
    