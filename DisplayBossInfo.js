import React from 'react';
import { useState, useEffect } from 'react';
import Description from './Description';
import BossAbilities from './BossAbilities';
import Items from './Items';

const DisplayBossInfo = ({ bossID, bossPictureID, clickedBossJSON, bossIsLoaded, apiKey }) => {

    const [bossItems, setBossItems] = useState();
    let bossName;

    if (clickedBossJSON) {
        bossName = clickedBossJSON['name']
    }

    console.log(clickedBossJSON);
    return (
        <div>
            <div>
                {bossIsLoaded === true && <h1>{bossName}</h1>}
                {bossIsLoaded === true && bossPictureID !== null && <img id='bossImage' src={'https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-' + bossPictureID + '.jpg'} alt='boss' width='400px' height='375px'></img>}
            </div>

            <Description description={clickedBossJSON['description']} />
            <h1>Abilities:</h1>
            <BossAbilities abilities={clickedBossJSON['sections']} />
            <h1>Items:</h1>
            <Items items={clickedBossJSON['items']} apiKey={apiKey} />


        </div >
    );
}

export default DisplayBossInfo;