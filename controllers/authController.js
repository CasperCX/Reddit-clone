const jwt = require('jsonwebtoken');
const { Client } = require('pg');
const conString = process.env.ELEPHANTSQL_URL || 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';

module.exports = {

    //TODO jwt.sing()
    login : async function(req, res){
        const client = new Client(conString);
            client.connect(function(err) {
            if(err) {
                return res.send("could not connect to database");
                }
            });

        try {
            const { username, password } = req.body;
            const user = {
                username,
                password
            };
            const token = await jwt.sign({ user }, process.env.SECRET_OR_KEY);
            res.send(token)
        } catch (err) {
            console.log(err);
        }
       

        client.end();

    },
    getToken: function (req, res) {
        if(!req.body.username || !req.body.password) {
            return res.status(401).send("no fields supplied");
        };

        //TODO - check the database if username and (hashed password match)
        const user = {
            username: req.body.username,
            password: req.body.password
        };

        jwt.sign({ user }, process.env.SECRET_OR_KEY, (err, token) => {
            res.json({ token });
        });
    },

    securePage: function (req, res) {
        jwt.verify(req.token, process.env.SECRET_OR_KEY) , (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.sendStatus(200);
            }
        }

    }
};

