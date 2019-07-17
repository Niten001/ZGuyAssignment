const express = require('express');
const app = express();
const parser = require('body-parser');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'U6ce;QoJ3WKRaZDDboEZ2zWY4yM',
    port: '5432'
});

const PORT = 8080;
const HOST = 'localhost';

app.use('/', express.static('./'));

app.get('/', (req, res) => {
    res.redirect('./index.html');
});

app.use(parser.urlencoded({ extended: true }));

app.post('/SignIn', function (req, res) {
    pool.query("SELECT passwordHash FROM users WHERE (username = '" + req.body.username + "');", function(err, result) {
        if (err) {
            console.log(err.stack);
        } else {
            if (result.rows[0]) {
                if (bcrypt.compareSync(req.body.password, result.rows[0].passwordhash)) {
                    pool.query("SELECT firstName, lastName, email, username FROM users WHERE (username = '" + req.body.username + "');", function(err, result) {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            res.send(result.rows[0]);
                        }
                    });
                } else {
                    res.send({
                        error: "Invalid username or password."
                    });
                }
            } else {
                res.send({
                    error: "Invalid username or password."
                });
            }
        }
    });
});

app.post('/SignUp', function(req, res) {
    pool.query("INSERT INTO users VALUES ('" + req.body.username + "', '" + bcrypt.hashSync(req.body.password, 13) + "', '" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "');", function(err, result) {
        if (err) {
            if (err.message == 'duplicate key value violates unique constraint "users_pkey"') {
                res.send({
                    error: {
                        usernameError: "Username already exists. Please use a different username.",
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                    }
                });
            } else {
                console.log(err.stack);
            }
        } else {
            res.send(200);
        }
    });
});

app.post('/DeleteUser', function(req, res) {
    pool.query("DELETE FROM users WHERE (username = '" + req.body.username + "');", function(err, result) {
        if (err) {
            console.log(err.stack);
        } else {
            res.send(result);
        }
    });
});

app.listen(8080);
console.log(`Running on http://${HOST}:${PORT}`);

