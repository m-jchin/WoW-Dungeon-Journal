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


const useGetFavorites = (cookie) => {
    const [favs, setFavs] = useState();
    let cookieObj = {
        'cookie': cookie,
    }

    const getFavorites = async (cookieObj, cookie) => {
        let favorites;
        favorites = await fetch('http://localhost:8080/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(cookieObj)
        });

        let fav = await favorites.json();
        return fav
    }

    useEffect(() => {
        getFavorites(cookieObj, cookie).then((res) => setFavs(res));
    }, [cookie]); // run only if cookie changes

    return favs;
}

const addFavorite = async (userAndDungeon) => {
    fetch('http://localhost:8080/AddFavorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userAndDungeon)
    });
}

const deleteFavorite = async (userAndDungeon) => {
    fetch('http://localhost:8080/DeleteFavorite', {
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
        let index = userFavoriteDungeons.indexOf(dungeonName);
        userFavoriteDungeons.splice(index, 1);
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
    })

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
                    <h1 id='dungeonNameSidebar'>{dungeonName}</h1>
                </div>}

            {!cookie || !userFavoriteDungeons && <h1 className='dungeonNameNoStar'>{dungeonName}</h1>}

            {<ol className={classes.list}>
                {children.map((text, index) => (
                    <li key={index} className='listItem'>{text}</li>
                ))}
            </ol>}


        </div >
    );
}
