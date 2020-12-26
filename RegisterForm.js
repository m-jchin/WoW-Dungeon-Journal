import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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




const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username)
        console.log(password);
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
                            <h2 id='createAccount'>Create Account</h2>
                            <label id='usernameLabel' htmlFor="username">Username:</label>
                            <input required id='username' type="text" value={username} onChange={(e) => handleUsername(e)} />

                            <label id='passwordLabel' htmlFor="username">Password:</label>
                            <input required type="text" id='password' value={password} onChange={(e) => handlePassword(e)} />

                            <div id='buttons'>
                                <input id='backBtn' type='button' value='Back' onClick={(e) => handleClick(e)} />
                                <input id='signUpBtn' type="submit" value="Sign Up" />
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default RegisterForm;