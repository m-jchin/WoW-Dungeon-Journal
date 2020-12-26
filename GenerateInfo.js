import React from 'react';
import { useState, useEffect } from 'react';
import DisplayBossInfo from './DisplayBossInfo';
import DungeonForm from './DungeonForm';
import Sidebar from './Sidebar';
import ScrollToTop from './ScrollToTop';
import './generateinfo.css';


// custom hook to make AJAX call the entire dungeon API json
const useFetchDungeonJSON = (dungeon, apiKey, setDungeonIsLoaded) => {
    const [data, setData] = useState(null);

    async function getDungeonJSON(dungeon, apiKey) {
        let callAPI = 'https://us.api.blizzard.com/data/wow/search/journal-encounter?namespace=static-us&locale=en_US&instance.name.en_US=' + dungeon + '&orderby=id&_page=1&access_token=' + apiKey
        //console.log(callAPI);
        let response = await fetch(callAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(response);
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


function GenerateInfo({ apiKey, dungeon, setSearched, setDungeon, searched, selectionMessage, setSelectionMessage }) {
    const [dungeonIsLoaded, setDungeonIsLoaded] = useState(false);
    const [clickedBoss, setClickedBoss] = useState();
    const [bossIsLoaded, setBossIsLoaded] = useState(false);

    let dungeonName;
    let sideBarNames = [];
    let arrayOfAllBosses = [];
    let bossID = null;
    let bossPictureID = null;
    let clickedBossJSON;
    let dungeonJSON = null;
    dungeonJSON = useFetchDungeonJSON(dungeon, apiKey, setDungeonIsLoaded);
    console.log(dungeonJSON);

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

        sideBarNames = sideBarNames.map(name => <button key={name} type='button' className='sideBarNames' onClick={() => saveBoss(name)}>{name}</button>);

        // filter arrayOfAllBosses for the boss that was clicked and save to 'boss'
        // then save the boss's ID to query specific boss encounter in fetch && id for boss media
        const boss = arrayOfAllBosses.filter(boss => boss.data.name.en_US.includes(clickedBoss))

        if (boss[0]) {
            bossID = boss[0]['data']['id'];
            //console.log(bossID);
            bossPictureID = boss[0]['data']['creatures'][0]['creature_display']['id']
        }
    }

    clickedBossJSON = useFetchWithBossID(bossID, apiKey, setBossIsLoaded);
    //console.log(clickedBossJSON);

    if (dungeonJSON && dungeonJSON['results'].length === 0) {
        return (
            <div>
                <div className='enterDungeonText'><h1>Dungeon Journal</h1></div>
                <DungeonForm setSearched={setSearched} setDungeon={setDungeon} size={'75'} setSelectionMessage={setSelectionMessage} />
                <h1 id='enterValidInstance'>Please enter a valid instance name!</h1>
            </div>


        );
    }
    else {
        return (
            <div id='container'>
                {dungeonIsLoaded === true &&
                    <Sidebar width={300} height={'100vh'} dungeonName={dungeonName} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage}>
                        {sideBarNames}
                    </Sidebar>
                }
                {selectionMessage && dungeonJSON && <div id='selectBossIntro'><h1>Please select a boss</h1></div>}
                {clickedBossJSON !== null && !selectionMessage &&
                    <div id='infoPanel'>
                        <DisplayBossInfo clickedBossJSON={clickedBossJSON} bossIsLoaded={bossIsLoaded} bossID={bossID} bossPictureID={bossPictureID} apiKey={apiKey} />
                    </div>}
            </div >
        );
    }
    //{dungeonIsLoaded === false && fetched && dungeonJSON !== '' && <DisplayDungeon arrayOfAllBosses={arrayOfAllBosses} dungeonIsLoaded={dungeonIsLoaded} clickedBoss={clickedBoss} apiKey={apiKey} bossIsLoaded={bossIsLoaded} setBossIsLoaded={setBossIsLoaded} searched={searched} bossMan={bossMan} />}

}

export default GenerateInfo;