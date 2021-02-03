import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './registerform.css';
import Cookies from 'js-cookie';




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
    // let x;
    let response = await fetch('http://localhost:8080/SignIn', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': true,

        },
        body: JSON.stringify(obj)
    }).then((res) => { return res })

    return response;

}

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory(); // react router hook to navigate back to home
    const classes = useStyles();

    if (Cookies.get('username')) {
        console.log('Cookie: ' + Cookies.get('username'));
        history.push('/');
    }
    const handleClick = (e) => {
        e.preventDefault();
        history.push('/');
    }

    let obj = {
        "username": username,
        "password": password
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username: ' + username + ', ' + 'Password: ' + password);

        login(obj).then((res) => {
            console.log(res);
            if (res.status === 200) {
                res.json().then((res) => Cookies.set('username', res));
                console.log('logged in');
                history.push('/');
            }
            else if (res.status === 401) {
                console.log('invalid login');
            }
        });

        console.log(Cookies.get('username'))

    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
        <div className='formDiv'>
            <h1 className='formTitle'>Dungeon Journal</h1>
            <div className='cardDiv'>
                <Card className={classes.root} variant='outlined'>
                    <CardContent>
                        <form className='registerForm' onSubmit={(e) => handleSubmit(e)} >
                            <h2 className='signUpHeader'>Sign In</h2>
                            <label className='usernameLabel' htmlFor="username">Username:</label>
                            <input required className='username' type="text" value={username} onChange={(e) => handleUsername(e)} />

                            <label className='passwordLabel' htmlFor="username">Password:</label>
                            <input required type="text" className='password' value={password} onChange={(e) => handlePassword(e)} />

                            <div className='backSignUpBtns'>
                                <input className='backBtn' type='button' value='Back' onClick={(e) => handleClick(e)} />
                                <input className='signUpBtn' type="submit" value="Sign In" />
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default SignIn;