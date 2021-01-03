const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 8080;
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mchin:lazdaCilRytXKW5C@cluster0.yc6vs.mongodb.net/dungeonJournal?retryWrites=true&w=majority";
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let user = null;
let pw = null;

const myAsyncFunction = async (user, pw) => {
    console.log(pw);
    let hash = await bcrypt.hash(pw, saltRounds);
    // connect to your cluster
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const db = client.db('dungeonJournal');
    // insert
    const loginCredentials = await db.collection('loginCredentials').insertOne({
        username: user,
        password: hash
    })
    console.log(loginCredentials.ops);

    // close connection
    client.close();
}

app.get('/RegisterForm', (req, res) => {
    res.send('Hello World!');
})

app.post('/RegisterForm', function (req, res) {
    res.send('Received login credentials!');
    console.log(req.body);
    user = req.body.username;
    pw = req.body.password;

    console.log(user);
    console.log(pw);

    myAsyncFunction(user, pw);

});

app.listen(port, () => {
    console.log('Server started...');
})


