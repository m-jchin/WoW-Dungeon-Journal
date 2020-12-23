import React from 'react';
import { useState, useEffect } from 'react';
import './items.css';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

/*
const useFetchItemInfo = (itemIDs, apiKey, setItemsLoaded) => {
    const [data, setData] = useState(null);


    async function getItemInfo(itemIDs, apiKey) {
        let arr = []
        for (let i = 0; i < itemIDs.length; i++) {
            let callAPI = 'https://us.api.blizzard.com/data/wow/item/' + itemIDs[i] + '?namespace=static-us&locale=en_US&access_token=' + apiKey
            let response = await fetch(callAPI, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            let json = await response.json()
            arr.push(json);
        }
        return arr
    }

    useEffect(() => {
        getItemInfo(itemIDs, apiKey).then(res => setData(res));
        setItemsLoaded(true);
    }, []);

    //console.log(data);
    return data
}

*/
/*

const useFetchItemMedia = (id, apiKey, setImagesLoaded) => {
    const [data, setData] = useState();
    async function getItemInfo(id, apiKey) {
        let callAPI = 'https://us.api.blizzard.com/data/wow/media/item/' + id + '?namespace=static-us&locale=en_US&access_token=' + apiKey
        let response = await fetch(callAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let json = await response.json()
        return json;
    }




    useEffect(() => {
        getItemInfo(id, apiKey).then(res => setData(res));
    }, [])
    return data;
}
*/
const Items = ({ items, apiKey }) => {
    const [data, setData] = useState(null);

    console.log(items);

    useEffect(() => {
        let itemIDs = [];
        for (let i = 0; i < items.length; i++) {
            itemIDs.push('https://us.api.blizzard.com/data/wow/media/item/' + items[i]['item']['id'] + '?namespace=static-us&locale=en_US&access_token=' + apiKey);
        }

        Promise.all(itemIDs.map(url => {
            let response = fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())

            return response
        }))
            .then(res => res)
            .then(res => setData(res)); //end promise all


    }, [items]) // reload every 'items' change

    console.log(data);
    let itemImages

    if (data) {
        itemImages = data.map((img, index) => {
            console.log(img['id'])
            let itemName = items.find(element => element['item']['id'] === img['id'])
            //  console.log(xName);

            return (

                <div className='itemDiv'>

                    <img src={img['assets'][0]['value']}></img>
                    {itemName && <h2>{itemName['item']['name']}</h2>}
                </div>
            );
        })
    }
    return (
        <div>
            {data && itemImages}
        </div>
    );

}

export default Items;