import React, { useEffect } from 'react';
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


const doesUserExist = async (userObj, setIsValid) => {
    let res = await fetch('http://localhost:8080/RegisterForm', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    }).then((response) => response.json()).then((response) => setIsValid(response));
}


const RegisterForm = ({ loaded }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(null);
    let history = useHistory(); // react router hook to navigate back to home
    const classes = useStyles();


    const handleClick = (e) => {
        e.preventDefault();
        history.goBack();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username)
        console.log(password);

        let userObj = {
            'username': username,
            'password': password
        };
        doesUserExist(userObj, setIsValid);
    }

    const handleUsername = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (isValid === true) {
            history.push('/')
        }
        else if (isValid === false) {
            window.alert('Username taken. Please try again.')
        }
        setIsValid(null);
    });


    return (
        <div className='formDiv'>
            <h1 className='formTitle'>Dungeon Journal</h1>
            <div className='cardDiv'>
                <Card className={classes.root} variant='outlined'>
                    <CardContent>
                        <form className='registerForm' onSubmit={(e) => handleSubmit(e)} >
                            <h2 className='signUpHeader'>Sign Up</h2>
                            <label className='usernameLabel' htmlFor="username">Username:</label>
                            <input required className='usernameInput' type="text" value={username} onChange={(e) => handleUsername(e)} />
                            <label className='passwordLabel' htmlFor="username">Password:</label>
                            <input required type="text" className='passwordInput' value={password} onChange={(e) => handlePassword(e)} />

                            <div className='backSignUpBtns'>
                                <input className='backBtn' type='button' value='Back' onClick={(e) => handleClick(e)} loaded={loaded} />
                                <input className='signUpBtn' type="submit" value="Sign Up" />
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default RegisterForm;