const express = require('express');

const app = express();
app.set('port', 5000);

app.get('/', (req, res) => {
    res.send("ok")
});

app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')} `);
});