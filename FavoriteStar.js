import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './favoritestar.css';
import StarIcon from '@material-ui/icons/Star';
import { useState, useEffect } from 'react';


const useAddFavorite = (favObj, setFavorites, changeFavorite, clicked, setClicked) => {

    const addFavorite = async (favObj) => {
        let response = await fetch('http://localhost:8080/AddFavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(favObj)
        });
        response = response.json();
        return response;
    }


    const deleteFavorites = async (favObj) => {
        let response = await fetch('http://localhost:8080/DeleteFavorite', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(favObj)
        });
        response = response.json();
        return response;
    }

    useEffect(() => {
        if (clicked) {
            if (changeFavorite) {
                addFavorite(favObj, setFavorites).then((res) => setFavorites(res));

            }
            else {
                deleteFavorites(favObj, setFavorites).then((res) => setFavorites(res));

            }

            setClicked(false);
        }

    }, [changeFavorite, clicked, favObj, setClicked, setFavorites])
}





// modify favorites with SetFavorites TODO


const FavoriteStar = ({ isFavorited, dungeonName, setFavorites, cookie }) => {
    const [changeFavorite, setChangeFavorite] = useState(isFavorited);
    const [clicked, setClicked] = useState(false);



    console.log(changeFavorite);
    let favObj = {
        'username': cookie,
        'dungeon': dungeonName.toLowerCase()
    }
    const handleClick = (e) => {
        e.preventDefault();
        console.log('click')
        setChangeFavorite(!changeFavorite);
        setClicked(true);
        console.log(isFavorited);
    }

    useAddFavorite(favObj, setFavorites, changeFavorite, clicked, setClicked);



    return (
        <div className='starDiv'>
            {changeFavorite && <IconButton aria-label="delete" size="small" onClick={(e) => handleClick(e)}>
                <StarIcon className='star' />
            </IconButton>}
            {!changeFavorite && <IconButton aria-label="delete" size="small" onClick={(e) => handleClick(e)}>
                <StarBorderIcon className='star' />
            </IconButton>}

        </div >
    );

}


export default FavoriteStar;

