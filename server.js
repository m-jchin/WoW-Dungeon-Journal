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
    if (req.isAuthenticated()) { // if already logged in, redirect away to home page
        res.redirect('/');
    }
    else {
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
        let cursor = await db.collection('loginCredentials').findOne({
            username: username
        });

        pwHash = cursor.password;
    }
    catch (e) {
        console.log(e);
    }

    // findOne returns a Cursor obj


    let isValid = await bcrypt.compare(password, pwHash);
    //console.log(isValid);
    if (isValid) {

        return true;
    }
    else {
        return false;
    }
}

const pushToDB = async (user, pw) => {
    let hash = '22';
    bcrypt.hash(pw, saltRounds).then((res) => {
        hash = res;
        console.log('HASH!!!: ' + hash);
    });
    // console.log(hash);
    // connect to your cluster
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // specify the DB's name
    const db = client.db('dungeonJournal');

    // insert
    console.log('INSERT HASH: ' + hash);
    const loginCredentials = await db.collection('loginCredentials').insertOne({
        username: user,
        password: hash
    });

    // loginCredentials.ops is the array in the result obj containing user/pw/id info
    console.log(loginCredentials.ops);

    // close connection
    client.close();
}

app.get('/', (req, res) => {
    res.send('Server Online');
});

app.post('/SignIn', (req, res, next) => {

    passport.authenticate('local', (e, user, info) => {

        if (e) {
            console.log('ERROR: ' + e);
            res.send(false);
        };
        console.log('req.body.username: ' + req.body.username);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        let x = JSON.stringify(req.body.username);
        console.log('Sent to frontend: ' + req.body.username);
        res.write(x);
        res.end();



    })(req, res, next);


});

passport.use(new LocalStrategy(
    async (username, password, done) => {

        let credentials;
        try {
            credentials = await validateCredentials(username, password);

        }
        catch (e) {
            console.log(e);
        }

        console.log('Credentials valid?  ' + credentials);

        if (credentials) {
            // verify callback for passport 
            return done(null, username);
        }
        else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }

));

passport.serializeUser((username, done) => {
    done(null, username);
});

passport.deserializeUser((username, done) => {
    return done(null, username);
});

app.post('/RegisterForm', function (req, res) {
    let username = null;
    let password = null;

    res.send('Received login credentials!');

    username = req.body.username;
    password = req.body.password;

    console.log(username);
    console.log(password);

    // send user/pw to db
    pushToDB(username, password);

});

app.listen(port, () => {
    console.log('Server started...');
})


