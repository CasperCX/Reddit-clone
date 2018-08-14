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

        const { rows } = await client.query('SELECT * FROM posts');
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

            const { title, body } = req.body;
            const result = await client.query('INSERT INTO posts(title, body) VALUES($1, $2) RETURNING *', [title, body])
            res.send(result)

        client.end();
    }
}

// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['brianc', 'brian.m.carlson@gmail.com']

// CREATE TABLE posts(
//     id serial PRIMARY KEY,
//     title VARCHAR (50) NOT NULL,
//     body VARCHAR (50) NOT NULL
//    );

// SELECT * FROM posts;
// DROP TABLE posts;

// INSERT INTO posts(title, body)
// VALUES
//  ('title1', 'bodyhere');