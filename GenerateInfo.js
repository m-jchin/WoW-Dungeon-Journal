import React from 'react';
import { useState, useEffect } from 'react';
import DisplayBossInfo from './DisplayBossInfo';
import DungeonForm from './DungeonForm';
import Sidebar from './Sidebar';
import './generateinfo.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const useStyles = makeStyles(() => ({
    sidebarButton: {
        color: 'rgb(242, 242, 242)',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'flex-start',
        textTransform: 'none',
    },
}));

// custom hook to make AJAX call the entire dungeon API json
const useFetchDungeonJSON = (dungeon, apiKey, setDungeonIsLoaded) => {
    const [data, setData] = useState(null);

    async function getDungeonJSON(dungeon, apiKey) {
        let callAPI = 'https://us.api.blizzard.com/data/wow/search/journal-encounter?namespace=static-us&locale=en_US&instance.name.en_US=' + dungeon + '&orderby=id&_page=1&access_token=' + apiKey
        let response = await fetch(callAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let json = response.json();
        return json
    }

    useEffect(() => {
        getDungeonJSON(dungeon, apiKey).then(res => {
            setData(res);
            setDungeonIsLoaded(true);
        });
    }, [apiKey, dungeon, setDungeonIsLoaded]);

    return data
}

const useFetchWithBossID = (bossID, apiKey, setBossIsLoaded) => {
    const [data, setData] = useState();

    async function getBossJSON(bossID, apiKey) {
        if (bossID == null) return null;
        let response = await fetch('https://us.api.blizzard.com/data/wow/journal-encounter/' + bossID + '?namespace=static-us&locale=en_US&access_token=' + apiKey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let json = await response.json();
        return json;
    }

    useEffect(() => {
        getBossJSON(bossID, apiKey).then(json => {
            setData(json);
            setBossIsLoaded(true);
        }).catch(error => {
            console.log(error);
        });
    }, [bossID, apiKey, setData, setBossIsLoaded]);

    if (bossID === null) {
        return null;
    }
    return data
}


function GenerateInfo({ setShowHomePage, userFavoriteDungeons, setCookie, cookie, apiKey, dungeon, setSearched, setDungeon, searched, selectionMessage, setSelectionMessage }) {
    const [dungeonIsLoaded, setDungeonIsLoaded] = useState(false);
    const [clickedBoss, setClickedBoss] = useState();
    const [bossIsLoaded, setBossIsLoaded] = useState(false);
    const classes = useStyles();
    let dungeonName;
    let sideBarNames = [];
    let arrayOfAllBosses = [];
    let bossID = null;
    let bossPictureID = null;
    let clickedBossJSON;
    let dungeonJSON = null;
    let loaded = 'true';
    dungeonJSON = useFetchDungeonJSON(dungeon, apiKey, setDungeonIsLoaded);


    if (dungeonJSON && dungeonJSON['results'].length !== 0) {
        // save each boss object to arrayOfAllBosses
        let apiCount = dungeonJSON['pageSize'];
        for (let i = 0; i < apiCount; i++) {
            arrayOfAllBosses[i] = dungeonJSON['results'][i];
        }

        dungeonName = arrayOfAllBosses[0]['data']['instance']['name']['en_US'];


        // setting boss names for sidebar
        for (let i = 0; i < arrayOfAllBosses.length; i++) {
            sideBarNames.push(arrayOfAllBosses[i]['data']['name']['en_US'])
        };

        // sidebar on-click loading of boss 
        const saveBoss = (bossName) => {
            setClickedBoss(bossName);
            setSelectionMessage(false);
            window.scrollTo(0, 0);
        }

        sideBarNames = sideBarNames.map(name => <Button key={name} className={classes.sidebarButton} onClick={() => saveBoss(name)}>{name}</Button>);

        // filter arrayOfAllBosses for the boss that was clicked and save to 'boss'
        // then save the boss's ID to query specific boss encounter in fetch && id for boss media
        const boss = arrayOfAllBosses.filter(boss => boss.data.name.en_US.includes(clickedBoss))

        if (boss[0]) {
            bossID = boss[0]['data']['id'];
            bossPictureID = boss[0]['data']['creatures'][0]['creature_display']['id']
        }
    }

    clickedBossJSON = useFetchWithBossID(bossID, apiKey, setBossIsLoaded);

    const clickTitle = (e) => {
        e.preventDefault();
        setSearched(false);
    }

    const handleClick = (e) => {
        e.preventDefault();
        Cookies.remove('username');
        setCookie(null);
    };

    const showFavorites = (e) => {
        e.preventDefault();
        setShowHomePage(false);
    }

    if (dungeonJSON && dungeonJSON['results'].length === 0) {
        return (
            <div className='invalidDungeonDiv'>
                <div className='invalidDungeonTitle'><h1>Dungeon Journal</h1></div>
                <DungeonForm setSearched={setSearched} setDungeon={setDungeon} size={'75'} setSelectionMessage={setSelectionMessage} />
                <div className='registerAndSignIn'>
                    {cookie ? null : <Link loaded={loaded} className='registerButton' to='/RegisterForm'>Register</Link>}
                    <div className='divider'></div>
                    {cookie && <button onClick={(e) => showFavorites(e)}>Favorites</button>}
                    {cookie ? <button onClick={(e) => handleClick(e)}>Log Out</button> : <Link loaded={loaded} className='registerButton' to='/SignIn'>Sign In</Link>}
                </div >
                <h1 className='enterValidInstance'>Please enter a valid instance name!</h1>
            </div>
        );
    }
    else {
        return (
            <div className='container'>
                <AppBar className='menuRoot' position="fixed">
                    <Toolbar className='menuBarSearch'>
                        <button className='appTitle' onClick={(e) => clickTitle(e)}>Dungeon Journal</button>
                        <div className='dungeonFormDiv'>
                            <DungeonForm size={'20'} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage} />
                        </div>

                        {!cookie && <div className='loginRegister'>
                            <Link loaded={loaded} className='registerButton' to='/RegisterForm'>Register</Link>
                            <Link loaded={loaded} className='registerButton' to='/SignIn'>Sign In</Link>
                        </div>
                        }
                        {cookie && <div className='favoriteLogoutButtons'>
                            <button className='registerButton' onClick={(e) => showFavorites(e)}>Favorites</button>
                            <button className='registerButton' onClick={(e) => handleClick(e)}>Log Out</button>
                        </div>}

                    </Toolbar>
                </AppBar>

                <div className='sidebarAndBossInfo'>
                    {dungeonIsLoaded === true &&
                        <Sidebar className='Sidebar' userFavoriteDungeons={userFavoriteDungeons} cookie={cookie} width={300} dungeonName={dungeonName} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage}>
                            {sideBarNames}
                        </Sidebar>
                    }
                    <div className='bossIntroAndInfo'>
                        {selectionMessage && dungeonJSON && <div className='selectBossIntro'><h1>Please select a boss</h1></div>}
                        {clickedBossJSON !== null && !selectionMessage && <DisplayBossInfo clickedBossJSON={clickedBossJSON} bossIsLoaded={bossIsLoaded} bossID={bossID} bossPictureID={bossPictureID} apiKey={apiKey} />}
                    </div>
                </div>
            </div >
        );
    }
}

export default GenerateInfo;
