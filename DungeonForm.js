import React from 'react';
import { useState } from 'react';
import './dungeonform.css';


const DungeonForm = ({ setSearched, setDungeon, size, setSelectionMessage }) => {
    let [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearched(true);
        setSelectionMessage(true)
        setDungeon(query.replace(' ', '%20')); // dungeon entered from user saved with setDungeon prop. '%20' needs to replaces spaces for valid api query
    }

    const handleType = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <form id='form' onSubmit={(e) => handleSubmit(e)} >
                <input required id='inputText' type="text" value={query} size={size} onChange={(e) => handleType(e)} />
                <input type="submit" value="Search" />
            </form>
        </div>


    );
}




export default DungeonForm;