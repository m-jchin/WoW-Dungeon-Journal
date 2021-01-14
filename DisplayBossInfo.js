import React from 'react';
import { useState, useEffect } from 'react';
import Description from './Description';
import BossAbilities from './BossAbilities';
import Items from './Items';
import ScrollToTop from './ScrollToTop';
import './displaybossinfo.css';
const DisplayBossInfo = ({ bossPictureID, clickedBossJSON, bossIsLoaded, apiKey }) => {

    let bossName;

    if (clickedBossJSON) {
        bossName = clickedBossJSON['name']
    }

    console.log(clickedBossJSON);
    return (
        <div className='infoDivs'>
            <div>
                {bossIsLoaded === true && <h1 className='infoFont'>{bossName}</h1>}
                {bossIsLoaded === true && bossPictureID !== null && <img id='bossImage' src={'https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-' + bossPictureID + '.jpg'} alt='boss' width='400px' height='375px'></img>}
            </div>

            <Description className='infoFont' description={clickedBossJSON['description']} />
            <h1 className='infoFont'>Abilities:</h1>
            <BossAbilities className='infoFont' abilities={clickedBossJSON['sections']} />
            <h1 className='infoFont'>Items:</h1>
            <Items items={clickedBossJSON['items']} apiKey={apiKey} />
            <div id='scrollTopDiv'>
                <ScrollToTop />
            </div>
        </div >
    );
}

export default DisplayBossInfo;