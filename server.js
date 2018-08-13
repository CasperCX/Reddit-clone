const express = require('express');
const db = require('./db');
const app = express();

//Connect to Postgres DB
const connection = new db();
const client = connection.createClient();
connection.createPool();
connection.connect(client);

app.set('port', 5000);

app.get('/', (req, res) => {
    res.send("ok")
});

app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')} `);
});