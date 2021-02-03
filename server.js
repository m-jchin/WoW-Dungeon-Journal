const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 8080;
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mchin:lazdaCilRytXKW5C@cluster0.yc6vs.mongodb.net/dungeonJournal?retryWrites=true&w=majority";
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const saltRounds = 10;
const session = require('express-session');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persist login sessions 


const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) { // if already logged in, redirect away to home page
        console.log('already logged in');
        res.header('Access-Control-Allow-Credentials', true);


    }
    else {
        res.header('Access-Control-Allow-Credentials', true);

        console.log('ERROR');
        next(); //if not authenticated, continue with login 
    }
}

const validateCredentials = async (username, password) => {
    let pwHash;

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = await client.db('dungeonJournal');

    try {
        let cursor = await db.collection('loginCredentials').findOne({    // findOne returns a Cursor obj
            username: username
        });

        pwHash = cursor.password;
    }
    catch (e) {
        console.log(e);
    }

    let isValid = await bcrypt.compare(password, pwHash);
    //console.log(isValid);
    if (isValid) {

        return true;
    }
    else {
        return false;
    }
}

const getFavorites = async (username) => {
    console.log('cookie: ' + username)
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = await client.db('dungeonJournal');

    try {
        let cursor = await db.collection('favorites').findOne({    // findOne returns a Cursor obj
            username: username
        });
        if (cursor) {
            console.log('cursor: ' + cursor.favorites);
            return cursor.favorites;
        }
        else {
            return null;
        }


    }
    catch (e) {
        console.log(e);
    }

}

const addFavorite = async (username, dungeon) => {
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db('dungeonJournal');

    const insertFavDungeon = await db.collection('favorites').updateOne(
        { username: username },
        { $push: { favorites: dungeon } }
    );

    // console.log(insertFavDungeon);
    client.close();
}

const deleteFavorite = async (username, dungeon) => {
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('dungeonJournal');

    const removeDungeon = await db.collection('favorites').updateOne(
        { username: username },
        { $pull: { 'favorites': dungeon } }
    );

    // console.log(removeDungeon);
    client.close();
}



const pushToDB = async (user, pw) => {
    let hash = '22';
    bcrypt.hash(pw, saltRounds).then((res) => {
        hash = res;
        console.log('HASH!!!: ' + hash);
    });

    // connect to your cluster
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // specify the DB's name
    const db = client.db('dungeonJournal');

    // insert
    console.log('INSERT HASH: ' + hash);
    let checkIfUserExists = await db.collection('loginCredentials').findOne({
        username: user
    });

    if (checkIfUserExists) {
        client.close();
        return false;
    }
    else {
        const loginCredentials = await db.collection('loginCredentials').insertOne({
            username: user,
            password: hash
        });
        console.log(loginCredentials.ops);
        client.close();
        return true;
    }
}

const createFavorites = async (username) => {
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // specify the DB's name
    const db = client.db('dungeonJournal');
    const userFavorites = await db.collection('favorites').insertOne({
        username: username,
        favorites: [],
    });

    client.close();
}

app.get('/', (req, res) => {
    res.send('Server Online');
});


app.post('/favorites', async (req, res) => {
    console.log(req.body.cookie)
    let username = req.body.cookie
    let favorites = await getFavorites(username);

    if (favorites) {
        console.log('!!!!' + favorites);
        res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(favorites));
    }
});

app.post('/AddFavorite', async (req, res) => {
    let username = req.body.username;
    let dungeon = req.body.dungeon;
    let fav = await getFavorites(username);

    if (!fav.includes(dungeon)) {
        addFavorite(username, dungeon);
        let fav = await getFavorites(username);
        res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(fav));
    }
    else {
        res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(fav));
    }
});

app.delete('/DeleteFavorite', async (req, res) => {
    let username = req.body.username;
    let dungeon = req.body.dungeon;
    deleteFavorite(username, dungeon);
    let fav = await getFavorites(username);
    console.log('favorites: ' + fav);
    res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(fav));
})

app.post('/SignIn', (req, res, next) => {
    passport.authenticate('local', (e, user, info) => {
        if (e) {
            console.log('ERROR: ' + e);
            res.send(false);
        };
        if (!info) {
            console.log('req.body.username: ' + req.body.username);
            res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(req.body.username));

        }
        else {
            res.status(401).header('Access-Control-Allow-Credentials', true).send({ message: 'invalid logins' });
            res.header("Access-Control-Allow-Credentials", "localhost:3000/SignIn");

            console.log(info);
        }
    })(req, res, next);
});

app.post('/RegisterForm', async function (req, res) {
    let username = null;
    let password = null;

    username = req.body.username;
    password = req.body.password;

    // send user/pw to db
    let validLogin = await pushToDB(username, password);
    console.log('did it work: ' + validLogin);
    if (validLogin === true) {
        createFavorites(username);
        res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(true));
    }
    else {
        console.log('username taken!');
        res.status(200).header('Access-Control-Allow-Credentials', true).send(JSON.stringify(false));
    }
});

app.listen(port, () => {
    console.log('Server started...');
})

passport.use(new LocalStrategy(
    async (username, password, done) => {
        let credentials;

        credentials = await validateCredentials(username, password);

        console.log('Credentials valid?  ' + credentials);

        if (credentials) {
            // verify callback for passport 
            return done(null, username);
        }
        else {
            console.log('invalid!')
            return done(null, false, { message: 'Incorrect password' });
        }
    }
));

passport.serializeUser((username, done) => {
    console.log('Serialized: ' + username);
    return done(null, username);
});

passport.deserializeUser((username, done) => {
    return done(null, username);
});




