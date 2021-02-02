import React from 'react';
import { useState, useEffect } from 'react';
import './favorites.css';


const Favorites = ({ setShowHomePage, userFavoriteDungeons, setSearched, setDungeon, setSelectionMessage }) => {

    const goBack = (e) => {
        e.preventDefault();
        setShowHomePage(true);
    }

    const navigateToDungeon = (e, text) => {
        console.log(text);
        e.preventDefault();
        setSearched(true);
        setDungeon(text.replace(' ', '%20'));
        setSelectionMessage(true)

        setShowHomePage(true)
    }
    return (
        <div className='favoriteDungeonsMenu'>
            <h1 className='favoritesTitle'>Favorites:</h1>
            {<ul className='listOfFavorites'>
                {userFavoriteDungeons.map((text, index) => (
                    <button onClick={(e) => navigateToDungeon(e, text)} key={index} className='favoriteListItem'>{text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</button>
                ))}
            </ul>}
            <button onClick={(e) => goBack(e)}>Back</button>

        </div>
    );
}
export default Favorites;