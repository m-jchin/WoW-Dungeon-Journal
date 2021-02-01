import "./sidebar.css"
import React from 'react';
import FavoriteStar from './FavoriteStar';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite } from "@material-ui/icons";


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

//{isFavorited === null && <h1 id='dungeonNameSidebar'>{dungeonName}</h1>}
export default function Sidebar({ children, dungeonName, cookie, isFavorited, favorites, setFavorites, setIsFavorited }) {
    const classes = useStyles();

    console.log(children);


    return (
        <div className='sidebarDiv'>
            {cookie &&
                <div className='starAndName'>
                    <FavoriteStar setFavorites={setFavorites} favorites={favorites} setIsFavorited={setIsFavorited} cookie={cookie} isFavorited={isFavorited} dungeonName={dungeonName} />
                    <h1 id='dungeonNameSidebar'>{dungeonName}</h1>
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
