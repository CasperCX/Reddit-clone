const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.set('port', 5000);
app.use('/', routes);

app.get('/', (req, res) => {
    res.send("ok")
});

app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')} `);
});