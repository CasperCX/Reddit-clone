const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const conString = process.env.ELEPHANTSQL_URL || 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';

module.exports = {

    login: async function (req, res) {
        const client = new Client(conString);
        client.connect(function(err) {
        if(err) {
            return res.send("could not connect to database");
            }
        });

        if(!req.body.username || !req.body.password) {
            return res.status(401).send("no fields supplied");
        };

        let user = {
            username: req.body.username,
            password: req.body.password
        };

        try {
            const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [user.username]);
            if (rows.length > 0) {
                const passwordIsValid = bcrypt.compareSync(user.password, rows[0].password);
                    if (!passwordIsValid) { 
                        return res.status(401).send({ auth: false, token: null, message: "Authentication failed"});
                    } else {
                        jwt.sign({ user }, process.env.SECRET_OR_KEY, (err, token) => {
                            if (err) {
                                return res.status(404).send({ auth: false, token: null, message: "Could not sign user"});
                            } else {
                                res.status(200).send({ auth: true, user_id: rows[0].user_id, token: token,  message: "successfully logged in"});
                            }
                        });                    
                    };
            } else {
                return res.status(404).send({ auth: false, token: null, message: "Authentication failed"});
            };

        } catch(err) {
            console.log(err);
        }

        client.end();
    },

    register: async function (req, res) {
        const client = new Client(conString);
        client.connect(function(err) {
        if(err) {
            return res.send("could not connect to database");
            }
        });

        //TODO check if username and password are sned along
        
        //Hash password using bcrypt
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
   
        let user = {
            username: req.body.username, 
            password: hashedPassword
        };

        try {
            const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [user.username]);
            console.log("looked for username got rows: ", rows);
            if (rows.length > 0) {
                return res.status(403).send({message: "username already exists"});
            } else {
                const { rows } = await client.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING username', [user.username, user.password]);
                return res.status(200).send({message: "registered user", user: rows});
            };
         
        } catch(err) {
            return res.status(404).send({message: "failed registerering user"});
        }
        client.end();
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

