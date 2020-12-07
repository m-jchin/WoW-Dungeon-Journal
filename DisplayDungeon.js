import React from 'react';
import './displaydungeon.css';
import BossPicture from './BossPicture';
import Description from './Description';
import BossAbilities from './BossAbilities';
import { useEffect, useState } from 'react';


const DisplayDungeon = ({ clickedBoss, arrayOfAllBosses, initialLoad, apiKey }) => {
    let bossID;
    let bossPictureID;
    let [journalEncounterIDResult, setJournalEncounterIDResult] = useState(null);
    let [isLoaded, setIsLoaded] = useState(false);

    // filter arrayOfAllBosses for the boss that was clicked and save to 'boss'
    // then save the boss's ID to query specific boss encounter in fetch && id for boss media
    const boss = arrayOfAllBosses.filter(boss => boss.data.name.en_US.includes(clickedBoss))
    if (boss[0]) {
        bossID = boss[0]['data']['id'];
        bossPictureID = boss[0]['data']['creatures'][0]['creature_display']['id']
    }
    console.log(boss);

    // fetch for boss-specific data using journal-encounter/{id} 
    useEffect(() => {
        let fetchAPI = 'https://us.api.blizzard.com/data/wow/journal-encounter/' + bossID + '?namespace=static-us&locale=en_US&access_token=' + apiKey

        fetch(fetchAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response =>
            response.json()
        ).then(result => {
            setJournalEncounterIDResult(result);
            setIsLoaded(true);
        });

    }, [setIsLoaded, setJournalEncounterIDResult, bossID, apiKey])

    return (
        <div>
            <h1 id='bossName'>{boss[0]['data']['name']['en_US']}</h1>
            <BossPicture bossMedia={'https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-' + bossPictureID + '.jpg'} />
            { isLoaded === true && <Description journalEncounterIDResult={journalEncounterIDResult} isLoaded={isLoaded} />}
            { isLoaded === true && <BossAbilities journalEncounterIDResult={journalEncounterIDResult} />}

        </div>
    );

}


export default DisplayDungeon;