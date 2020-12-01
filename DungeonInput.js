
import { useEffect, useState } from 'react';

const DungeonInput = ({ setSearched, setDungeon, dungeon, query, setQuery }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearched(true);
        setDungeon(query.replace(' ', '&'));
        setTimeout(() => { setQuery(''); }, 500);
    }

    useEffect(() => { //delay constant rerender while typing a new dungeon
        const timeOut = setTimeout(() => setDungeon(query), 5000);
        return () => clearTimeout(timeOut); // without this line, each onChange would eventually render one after another
    })

    return (
        <form onSubmit={(e) => handleSubmit(e)} >
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <input type="submit" value="Search" />
        </form>
    );

}

export default DungeonInput;