import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './favoritestar.css';
import StarIcon from '@material-ui/icons/Star';
import { useState, useEffect } from 'react';

/*
TODO: make sure favoriting a dungeon doesn't keep the star gold for another searched dungeon that is not active favorite;
*/


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
    console.log(response);
    return response;
}


const deleteFavorite = async (favObj) => {
    let response = await fetch('http://localhost:8080/DeleteFavorite', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(favObj)
    });
    response = response.json();
    console.log(response);
    return response;


}




const useGetFavorites = (cookie, setFavoriteDungeonsList, dungeonName, favoriteDungeonsList, setDungeonIsFavorited) => {
    let cookieObj = {
        'cookie': cookie,
    }

    const getFavorites = async (cookieObj, cookie) => {
        console.log(JSON.stringify(cookie));
        let favorites;
        if (cookie) {

            favorites = await fetch('http://localhost:8080/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(cookieObj)
            });

            console.log(favorites)
            if (favorites) {
                return favorites.json();
            }
        }
        else {
            return null;
        }
    }

    useEffect(() => {
        getFavorites(cookieObj, cookie).then((res) => setFavoriteDungeonsList(res));


    }, [cookie,]); // run only if cookie changes
}



// modify favorites with SetFavorites TODO


const FavoriteStar = ({ dungeonName, cookie }) => {
    console.log(dungeonName);
    const [favoriteDungeonsList, setFavoriteDungeonsList] = useState(null);
    const [dungeonIsFavorited, setDungeonIsFavorited] = useState(false);

    /* initial star load */
    useGetFavorites(cookie, setFavoriteDungeonsList, favoriteDungeonsList, dungeonName, setDungeonIsFavorited); // 1) get favorites from server
    useEffect(() => {
        if (favoriteDungeonsList) {
            if (favoriteDungeonsList.includes(dungeonName.replace('%20', ' ').toLowerCase())) { // if dungeon is already favorited, display gold star with delete-dungeon onClick
                setDungeonIsFavorited(true);
            }
            else {
                setDungeonIsFavorited(false);
            }
        }
    });


    console.log(dungeonIsFavorited);

    let favObj = {
        'username': cookie,
        'dungeon': dungeonName.toLowerCase()
    }

    let response;
    const handleClick = (e) => {
        e.preventDefault();
        setDungeonIsFavorited(!dungeonIsFavorited);

        if (dungeonIsFavorited) {
            response = addFavorite(favObj);
        }
        else {
            response = deleteFavorite(favObj);
        }
    }

    useEffect(() => {
        setFavoriteDungeonsList(response);
    })

    //   useAddFavorite(favObj, setFavoriteDungeonsList, changeFavorite, setDungeonIsFavorited);


    return (
        <div className='starDiv'>
            {dungeonIsFavorited === true && <IconButton aria-label="delete" size="small" onClick={(e) => handleClick(e)}>
                <StarIcon className='star' />
            </IconButton>}
            {dungeonIsFavorited === false && <IconButton aria-label="delete" size="small" onClick={(e) => handleClick(e)}>
                <StarBorderIcon className='star' />
            </IconButton>}

        </div >
    );

}


export default FavoriteStar;

