const express = require('express');
const app = express();
const parser = require('body-parser');

const PORT = 8080;
const HOST = 'localhost';

app.get('/', (req, res) => {
    app.use('/', express.static('./'));
    res.redirect('./index.html');
});

app.use(parser.urlencoded({ extended: true }));

app.post('/SignIn', function (req, res) {
    console.log(req.body.username);
});

app.post('/SignUp', function(req, res) {
    console.log(req.body);
});

app.listen(8080);
console.log(`Running on http://${HOST}:${PORT}`);