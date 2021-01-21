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

const authenticateLogin = async (passport, username, password) => {

}
passport.use(new LocalStrategy(authenticateLogin));

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // if already logged in, redirect away to home page
        res.redirect('/');
    }
    else {
        next(); //if not authenticated, continue with login 
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

const validateCredentials = async (user, pw) => {
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = await client.db('dungeonJournal');

    // findOne returns a Cursor obj
    let cursor = await db.collection('loginCredentials').findOne({
        username: user
    });

    let pwHash = cursor.password;

    let isValid = await bcrypt.compare(pw, pwHash);
    //console.log(isValid);
    if (isValid) {

        return true;
    }
    else {
        return false;
    }
}



app.get('/', (req, res) => {
    res.send('Server Online');
});

app.post('/SignIn', (req, res) => {
    //console.log(req.body);

    let user = req.body.username;
    let pw = req.body.password;

    validateCredentials(user, pw).then((response) => res.send(response));
    // res.send(x);

});

app.post('/SignIn', passport.authenticate('local', { failureRedirect: '/SignIn' }), isLoggedIn);

app.post('/RegisterForm', function (req, res) {
    let user = null;
    let pw = null;

    res.send('Received login credentials!');

    user = req.body.username;
    pw = req.body.password;

    console.log(user);
    console.log(pw);

    // send user/pw to db
    pushToDB(user, pw);

});

app.listen(port, () => {
    console.log('Server started...');
})


