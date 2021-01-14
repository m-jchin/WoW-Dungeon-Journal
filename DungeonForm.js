import React from 'react';
import { useState } from 'react';
import './dungeonform.css';


const DungeonForm = ({ setSearched, setDungeon, size, setSelectionMessage }) => {
    const [query, setQuery] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setSearched(true);
        setSelectionMessage(true)
        setDungeon(query.replace(' ', '%20')); // dungeon entered from user saved with setDungeon prop. '%20' needs to replaces spaces for valid api query
        setQuery('');
    }

    const handleType = (e) => {
        setQuery(e.target.value)
    }

    return (
        <form className='form' onSubmit={(e) => handleSubmit(e)} >
            <input required className='searchField' placeholder='Enter instance name..' type="text" value={query} size={size} onChange={(e) => handleType(e)} />
            <input className='searchButton' type="submit" value="Search" />
        </form>
    );
}




export default DungeonForm;