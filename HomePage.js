import React from 'react';
import { useState, useEffect } from 'react';
import './HomePage.css';
import DungeonForm from './DungeonForm';
import GenerateInfo from './GenerateInfo';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


let CONFIG = require('./apikeys.json');

// custom hook to make AJAX call for API key using API credentials & async for await
const useFetch = (id, secret, setCookie) => {
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
        setCookie(Cookies.get('username'));
        return () => { isMounted = false };
    });

    return data
}

const useFavorites = (cookie, setFavorites) => {
    let cookieObj = {
        'cookie': cookie,
    }

    const getFavorites = async (cookieObj, cookie) => {
        console.log(JSON.stringify(cookie));
        if (cookie) {
            let favorites = await fetch('http://localhost:8080/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(cookieObj)
            })

            console.log(favorites)
            return favorites.json();
        }
        else {
            return null;
        }
    }

    useEffect(() => {
        getFavorites(cookieObj, cookie).then((res) => setFavorites(res));
    }, [cookie]); // run only if cookie changes



}

function HomePage() {
    let id = CONFIG.id;
    let secret = CONFIG.secret;
    let loaded = 'false';
    const [cookie, setCookie] = useState(null);
    const [searched, setSearched] = useState(false);
    const [dungeon, setDungeon] = useState();
    const [selectionMessage, setSelectionMessage] = useState(false);
    const apiKey = useFetch(id, secret, setCookie);
    // const [favorites, setFavorites] = useState();
    const [favorites, setFavorites] = useState();
    useFavorites(cookie, setFavorites);
    //let favorites = useFavorites(cookie);
    console.log(favorites);

    //let cookie = Cookies.get('username');
    //{ searched && <GenerateInfo dungeon={dungeon} apiKey={apiKey} searched={searched} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage} selectionMessage={selectionMessage} />}

    const handleClick = (e) => {
        e.preventDefault();
        Cookies.remove('username');
        setCookie(null);
    };

    console.log(cookie);

    return (
        <div className='homePageDiv'>
            <div className='searchAndLoginButtons'>
                {!searched &&
                    <span id='formPanel'>
                        <h1 id='title'>Dungeon Journal</h1>
                        <DungeonForm apiKey={apiKey} setSearched={setSearched} searched={searched} setDungeon={setDungeon} dungeon={dungeon} size={'75'} setSelectionMessage={setSelectionMessage} selectionMessage={selectionMessage} />
                    </span>}

                {!searched && <div className='registerAndSignIn'>
                    <Link loaded={loaded} className='registerButton' to='/RegisterForm'>Register</Link>
                    <div className='divider'></div>
                    {cookie ? <button onClick={(e) => handleClick(e)}>Log Out</button> : <Link loaded={loaded} className='registerButton' to='/SignIn'>Sign In</Link>}
                </div >}
            </div>


            { searched && <GenerateInfo setFavorites={setFavorites} cookie={cookie} favorites={favorites} dungeon={dungeon} apiKey={apiKey} searched={searched} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage} selectionMessage={selectionMessage} />}

        </div >
    );

}

export default HomePage;

