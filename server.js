const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 8080;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/RegisterForm', (req, res) => {
    res.send('Hello World!');
})

app.post('/RegisterForm', function (req, res) {
    res.send('Received login credentials!');
    console.log(req.body);

});

app.listen(port, () => {
    console.log('Server started...');
})