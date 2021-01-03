import React from 'react';
import { useState, useEffect } from 'react';
import './HomePage.css';
import DungeonForm from './DungeonForm';
import GenerateInfo from './GenerateInfo';
//import Register from './Register';
import RegisterForm from './RegisterForm';
import SignIn from './SignIn';
import { Link, Switch, BrowserRouter, Route } from 'react-router-dom';
let CONFIG = require('./apikeys.json');

// custom hook to make AJAX call for API key using API credentials
const useFetch = (id, secret) => {
    const [data, setData] = useState(null);

    async function getToken(id, secret) {

        let response = await fetch('https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=' + id + '&client_secret=' + secret, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            }
        })
        let json = await response.json();
        return json.access_token
    }

    useEffect(() => {
        let isMounted = true;
        getToken(id, secret).then(key => { if (isMounted) setData(key) });

        return () => { isMounted = false };
    });

    return data
}


function HomePage() {
    let id = CONFIG.id;
    let secret = CONFIG.secret;
    const apiKey = useFetch(id, secret);
    let [searched, setSearched] = useState(false);
    let [dungeon, setDungeon] = useState();
    const [selectionMessage, setSelectionMessage] = useState(false);

    //console.log(dungeon);

    return (
        <div>
            {searched === false &&
                <span id='formPanel'>
                    <h1 id='title'>Dungeon Journal</h1>
                    <DungeonForm setSearched={setSearched} setDungeon={setDungeon} size={'75'} setSelectionMessage={setSelectionMessage} />
                </span>}
            {!searched && <Link className='registerButton' to='/RegisterForm'>Register</Link>}
            {!searched && <div id='registerAndSignIn'>
            </div >}
            { searched && <GenerateInfo dungeon={dungeon} apiKey={apiKey} searched={searched} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage} selectionMessage={selectionMessage} />}
        </div >
    );

}
//<SignIn />
export default HomePage;