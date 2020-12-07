import React from 'react';
import { useState, useEffect } from 'react';
import DisplayDungeon from './DisplayDungeon';
import Sidebar from './Sidebar';
import './generateinfo.css';

function GenerateInfo({ apiKey, dungeon, dungeonJSON, setDungeonJSON, initialLoad, setInitialLoad }) {
    let [fetched, setFetched] = useState(false);
    let [clickedBoss, setClickedBoss] = useState();
    let [boss, setBoss] = useState(null);

    // fetch JSON info about dungeon searched by user
    useEffect(() => {
        if (dungeon !== '' && apiKey) {
            let callAPI = 'https://us.api.blizzard.com/data/wow/search/journal-encounter?namespace=static-us&locale=en_US&instance.name.en_US=' + dungeon + '&orderby=id&_page=1&access_token=' + apiKey
            fetch(callAPI, {
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', }
            })
                .then(res => res.json())
                .then((result => {
                    setDungeonJSON(result);
                }));
        }
        setFetched(true);
    }, [dungeon, apiKey, setDungeonJSON, setFetched])


    if (dungeonJSON === null) {
        return null;
    }

    // save each boss object to arrayOfAllBosses
    let arrayOfAllBosses = [];
    let apiCount = dungeonJSON['pageSize'];
    for (let i = 0; i < apiCount; i++) {
        arrayOfAllBosses[i] = dungeonJSON['results'][i];
    }
    console.log(arrayOfAllBosses);
    let dungeonName = arrayOfAllBosses[0]['data']['instance']['name']['en_US'];

    // setting boss names for sidebar
    let sideBarNames = [];
    for (let i = 0; i < arrayOfAllBosses.length; i++) {
        sideBarNames.push(arrayOfAllBosses[i]['data']['name']['en_US'])
    };

    // sidebar on-click loading of boss 
    const saveBoss = (bossName) => {
        setClickedBoss(bossName);
        setInitialLoad(false);
        setBoss(arrayOfAllBosses.filter(boss => boss.data.name.en_US.includes(clickedBoss)));
    }

    sideBarNames = sideBarNames.map(name => <a key={name} href='###' className='sideBarNames' onClick={() => saveBoss(name)}>{name}</a>);

    return (
        <span id='flexContainer'>
            <span id='sidebarPanel'>
                <Sidebar width={300} height={'100vh'} setClickedBoss={setClickedBoss} dungeonName={dungeonName}>
                    {sideBarNames}
                </Sidebar>
            </span>
            <span id='infoPanel'>
                {initialLoad === true && <div><h1>Please select a boss!</h1></div>}
                {initialLoad === false && fetched && dungeonJSON !== '' && <DisplayDungeon arrayOfAllBosses={arrayOfAllBosses} initialLoad={initialLoad} clickedBoss={clickedBoss} boss={boss} apiKey={apiKey} />}
            </span>
        </span>
    );
}

export default GenerateInfo;

