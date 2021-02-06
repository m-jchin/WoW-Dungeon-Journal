import React from 'react';
import { useState, useEffect } from 'react';
import './items.css';

const Items = ({ items, apiKey }) => {
    const [data, setData] = useState(null);

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

    }, [apiKey, items]) // reload every 'items' change

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
                    {itemName && <h2 className='items'>{itemName['item']['name']}</h2>}
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