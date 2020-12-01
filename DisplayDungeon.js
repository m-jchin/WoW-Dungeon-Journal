import './displaydungeon.css';
import { useEffect, useState } from 'react';


const DisplayDungeon = ({ clickedBoss, bossArray, initialLoad, setInitialLoad }) => {
    console.log(bossArray);
    console.log(clickedBoss);
    let [bossEncounterInfo, setBossEncounterInfo] = useState();
    let [bossMedia, setBossMedia] = useState();


    const boss = bossArray.filter(boss => boss.data.name.en_US.includes(clickedBoss))
    console.log(boss);
    let bossID;
    let bossPictureID;
    let searched = false;

    if (boss[0]) {
        bossID = boss[0]['data']['id'];
        bossPictureID = boss[0]['data']['creatures'][0]['creature_display']['id']

    }

    useEffect(() => {
        if (bossID) {
            fetch('https://us.api.blizzard.com/data/wow/journal-encounter/' + bossID + '?namespace=static-us&locale=en_US&access_token=US568dbV6dLSp0FbsYa7lF14TQ4BY88zJR', {
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', }
            })
                .then(res => res.json())
                .then((result => {
                    setBossEncounterInfo(result);
                }));
        };
        return () => { }
    }, [setBossEncounterInfo, bossID]);

    useEffect(() => {
        if (bossPictureID) {
            fetch('https://us.api.blizzard.com/data/wow/media/creature-display/' + bossPictureID + '?namespace=static-us&locale=en_US&access_token=US568dbV6dLSp0FbsYa7lF14TQ4BY88zJR', {
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', }
            })
                .then(res => res.json())
                .then((result => {
                    setBossMedia(result['assets'][0]['value']);
                }));
        }
    }, [bossPictureID, setBossMedia])


    if (initialLoad === true) {
        return (
            <div>
                <h1>Please select a boss</h1>
            </div>
        );
    }

    console.log(bossID);
    console.log(bossPictureID);
    console.log(bossEncounterInfo);
    console.log(bossMedia);






    return (
        <div>
            <h3 id='parentDiv'>
                {boss[0]['data']['name']['en_US']}
            </h3>
            <img src={bossMedia} alt=' boss' width='200px' height='200px'></img>



        </div >


    );

}
// TODO: Delete remove DungeonInput.js from folder
export default DisplayDungeon;