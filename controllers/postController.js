// const db = require('../db');

// Connect to Postgres DB
var { Client } = require('pg');
var conString = process.env.ELEPHANTSQL_URL || 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';


module.exports = {
    getPosts : async function(req, res){
        const client = new Client(conString);
            client.connect(function(err) {
            if(err) {
                return res.send("could not connect to database");
                }
            });
        
        const { sub } = req.params;
        const { rows } = await client.query('SELECT * FROM posts WHERE sub = $1', [sub]);
        res.send(rows)

        client.end();

    },
    getPost : async function(req, res){
        const client = new Client(conString);
            client.connect(function(err) {
            if(err) {
                return res.send("could not connect to database");
                }
            });

        const { id } = req.params;
        const { rows } = await client.query('SELECT * FROM posts WHERE id = $1', [id])
        res.send(rows[0])
    
        client.end();
    },

    postPost : async function(req, res){
        const client = new Client(conString);
            client.connect(function(err) {
            if(err) {
                return res.send("could not connect to database");
                }
            });

            const { user_id, title, body, sub } = req.body;
            const result = await client.query('INSERT INTO posts(user_id, sub, title, body) VALUES($1, $2, $3, $4) RETURNING *', [user_id, sub, title, body])
            res.send(result)

        client.end();
    }
}

