import React from 'react';
import './scrolltotop.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';



const ScrollToTop = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <div className='scrollTopBtn'>
            <IconButton aria-label="delete" className='upIcon' size="small" onClick={(e) => handleSubmit(e)}>
                <ArrowUpwardIcon size='large' fontSize="large" />
            </IconButton>
        </div>
    );
}











export default ScrollToTop;