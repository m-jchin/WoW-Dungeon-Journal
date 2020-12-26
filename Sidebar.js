import DungeonForm from './DungeonForm';
import "./sidebar.css"
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ScrollToTop from './ScrollToTop';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 100 % '!important',
        flexDirection: 'column',
        borderRadius: 0,
    },
    drawer: {
        position: 'relative',
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    itemList: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },



}));



export default function Sidebar({ children, setSearched, dungeonName, setDungeon, setSelectionMessage }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <DungeonForm className='sidebarSearch' size={'20'} setSearched={setSearched} setDungeon={setDungeon} setSelectionMessage={setSelectionMessage} />
                <h1 id='title'>{dungeonName}</h1>
                <List>
                    {children.map((text, index) => (
                        <ListItem key={index} button className={classes.itemList}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>

                <div id='scrollTopDiv'>
                    <ScrollToTop />
                </div>
            </Drawer>

        </div>

    );
}
