import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './registerform.css';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const login = async (obj) => {
    let response = await fetch('http://localhost:8080/SignIn', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    console.log(response);
    return response.json();
}

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory(); // react router hook to navigate back to home
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let obj = {
            'username': username,
            'password': password
        };



        login(obj).then((res) => console.log(res));
        //  console.log(JSON.stringify(x));
        history.push('/');
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div id='formDiv'>
            <h1 id='title'>Dungeon Journal</h1>
            <div id='cardDiv'>
                <Card className={classes.root} variant='outlined'>
                    <CardContent>
                        <form id='registerForm' onSubmit={(e) => handleSubmit(e)} >
                            <h2 id='createAccount'>Sign In</h2>
                            <label id='usernameLabel' htmlFor="username">Username:</label>
                            <input required id='username' type="text" value={username} onChange={(e) => handleUsername(e)} />

                            <label id='passwordLabel' htmlFor="username">Password:</label>
                            <input required type="text" id='password' value={password} onChange={(e) => handlePassword(e)} />

                            <div id='buttons'>
                                <input id='backBtn' type='button' value='Back' onClick={(e) => handleClick(e)} />
                                <input id='signUpBtn' type="submit" value="Sign In" />
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default SignIn;