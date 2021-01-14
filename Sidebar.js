import "./sidebar.css"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


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
    }
}));


export default function Sidebar({ children, dungeonName }) {
    const classes = useStyles();
    console.log(children);
    return (
        <div className='sidebarDiv'>
            <h1 id='dungeonNameSidebar'>{dungeonName}</h1>
            {<ol className={classes.list}>
                {children.map((text, index) => (
                    <li key={index} className='listItem'>{text}</li>
                ))}
            </ol>}

        </div >
    );
}
