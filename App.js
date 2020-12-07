import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import DungeonForm from './DungeonForm';
import GenerateInfo from './GenerateInfo';
let CONFIG = require('./apikeys.json');

// custom hook to make AJAX call for API key using API credentials
const useFetch = (id, secret) => {
  const [data, setData] = useState(null);

  async function getToken(id, secret) {

    let response = await fetch('https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=' + id + '&client_secret=' + secret, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

      }
    })
    let json = await response.json();
    return json.access_token
  }

  useEffect(() => {
    getToken(id, secret).then(key => { setData(key) });
  });

  return data
}


function App() {
  let id = CONFIG.id;
  let secret = CONFIG.secret;

  const apiKey = useFetch(id, secret);
  const [dungeonJSON, setDungeonJSON] = useState(null);
  let [searched, setSearched] = useState(false);
  let [dungeon, setDungeon] = useState('');
  let [globalLoad, setGlobalLoad] = useState(true);
  let [initialLoad, setInitialLoad] = useState(true);

  return (
    <div>
      <span id='formPanel'>
        <h1 id='title'>Dungeon Journal</h1>
        <DungeonForm apiKey={apiKey} dungeonJSON={dungeonJSON} setDungeonJSON={setDungeonJSON} setSearched={setSearched} setDungeon={setDungeon} setGlobalLoad={setGlobalLoad} setInitialLoad={setInitialLoad} />
      </span>
      {searched && <GenerateInfo dungeon={dungeon} apiKey={apiKey} dungeonJSON={dungeonJSON} setDungeonJSON={setDungeonJSON} globalLoad={globalLoad} initialLoad={initialLoad} setInitialLoad={setInitialLoad} />}
    </div>
  );

}

export default App;
