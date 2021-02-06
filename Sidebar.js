import "./sidebar.css"
import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        marginTop: '8%',

        width: '250px',
        backgroundColor: 'rgb(46, 45, 45)',
        borderBottom: '4px solid gray',

        textAlign: 'left',
    },
    list: {
        color: 'red',
    },
}));
//https://dungeonjournal.herokuapp.com/AddFavorite
const addFavorite = async (userAndDungeon) => {
    fetch('/AddFavorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userAndDungeon)
    });
}

const deleteFavorite = async (userAndDungeon) => {
    fetch('/DeleteFavorite', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userAndDungeon)
    });
}

export default function Sidebar({ children, dungeonName, cookie, userFavoriteDungeons }) {
    const classes = useStyles();
    console.log(userFavoriteDungeons);

    const [ifExists, setIfExists] = useState(false);

    let userAndDungeon = {
        'username': cookie,
        'dungeon': dungeonName.toLowerCase()
    }

    const deleteDungeon = (e) => {
        e.preventDefault();
        deleteFavorite(userAndDungeon)
        setIfExists(false);
        console.log(JSON.stringify(dungeonName.toString().toLowerCase()));
        console.log(userFavoriteDungeons);
        let a = userFavoriteDungeons.indexOf(dungeonName.toString().toLowerCase());
        console.log(a);
        userFavoriteDungeons = userFavoriteDungeons.splice(a, 1);
        console.log(userFavoriteDungeons);
    }

    const addDungeon = (e) => {
        e.preventDefault();
        addFavorite(userAndDungeon);
        setIfExists(true);
        userFavoriteDungeons.push(dungeonName.replace('%20', ' ').toLowerCase());
    }

    useEffect(() => {
        if (userFavoriteDungeons) {
            if (userFavoriteDungeons.includes(dungeonName.replace('%20', ' ').toLowerCase())) {
                setIfExists(true);
            }
            else {
                setIfExists(false);
            }
        }
    }, [userFavoriteDungeons, dungeonName, setIfExists]);

    console.log(ifExists);
    return (
        <div className='sidebarDiv'>
            {cookie && userFavoriteDungeons &&
                <div className='starAndName'>
                    {ifExists === true && <IconButton aria-label="delete" size="small" onClick={(e) => deleteDungeon(e)}>
                        <StarIcon className='star' />
                    </IconButton>}
                    {ifExists === false && <IconButton aria-label="delete" size="small" onClick={(e) => addDungeon(e)}>
                        <StarBorderIcon className='star' />
                    </IconButton>}
                    <h1 className='dungeonNameSidebar'>{dungeonName}</h1>
                </div>}
            {!cookie && <h1 className='dungeonNameNoStar'>{dungeonName}</h1>}
            {<ol className={classes.list}>
                {children.map((text, index) => (
                    <li key={index} className='listItem'>{text}</li>
                ))}
            </ol>}
        </div >
    );
}
