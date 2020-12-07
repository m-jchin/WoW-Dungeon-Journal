import React from 'react';
import { useState, useEffect } from 'react';
import './dungeonform.css';

const DungeonForm = ({ setSearched, setDungeon, setInitialLoad }) => {
    let [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setInitialLoad(true);
        setSearched(true);
        setDungeon(query.replace(' ', '%20')); // dungeon entered from user saved with setDungeon prop. '%20' needs to replaces spaces for valid api query
        setTimeout(() => { setQuery(''); }, 500);
    }

    const handleType = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => { //delay constant rerender while typing in the text input field
        const timeOut = setTimeout(() => setDungeon(query), 5000);
        return () => clearTimeout(timeOut); // without this line, each onChange would eventually render one after another
    })

    return (
        <div>
            <form id='form' onSubmit={(e) => handleSubmit(e)} >
                <input id='inputText' type="text" value={query} size='75' onChange={(e) => handleType(e)} />
                <input type="submit" value="Search" />
            </form>
        </div>

    );
}




export default DungeonForm;