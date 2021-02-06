import React from 'react';
import { useState, useEffect } from 'react';
import './scrolltotop.css';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const useStyles = makeStyles(() => ({
    icon: {
        color: '#FFFFFF',
    },
}));

const ScrollToTop = () => {
    const classes = useStyles();
    const [isHide, setIsHide] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const hideBar = () => {
        let y = 300;
        window.scrollY > y ?
            !isHide && setIsHide(true)
            :
            isHide && setIsHide(false)

        y = window.scrollY;
    }

    useEffect(() => {
        window.addEventListener('scroll', hideBar);

        return function cleanup() {
            window.removeEventListener('scroll', hideBar);
        };
    });

    const classHide = isHide ? '' : 'hide';

    return (
        <div className={classHide} >
            <IconButton aria-label="delete" className={classes.icon} size="small" onClick={(e) => handleSubmit(e)}>
                <ArrowUpwardIcon size='large' fontSize="large" />
            </IconButton>
        </div >
    );
}











export default ScrollToTop;