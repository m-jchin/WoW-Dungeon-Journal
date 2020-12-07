import React from 'react';
import './bosspicture.css';

const BossPicture = ({ bossMedia }) => {

    return (
        <div id='pictureDiv'>
            <img src={bossMedia} alt='boss' width='400px' height='375px'></img>
        </div>

    );
}

export default BossPicture;