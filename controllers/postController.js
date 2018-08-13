// const db = require('../db');

// Connect to Postgres DB
var pg = require('pg');
// var connectionString = 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';

var conString = process.env.ELEPHANTSQL_URL || 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';
let client = new pg.Client(conString);
    client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
        }
    });

    
module.exports = {
    getPosts : function(req, res){
      
    },
    getPost : async function(req, res){
            const { id } = req.params;
            const { rows } = await client.query('SELECT * FROM posts WHERE id = $1', [id])
            res.send(rows[0])
    
        
            client.end();
        },
    

    postPost : function(req, res){
        const query = {
            text: 'INSERT INTO posts(title, body) VALUES($1, $2)',
            values: [`${req.body.title}`, `${req.body.body}`],
          }
          client.query(query.text, query.values)
            .then(res => {
                console.log(res.rows[0])
            }).catch(e => console.error(e.stack))
           
        //   console.log("CONNECTION:", connection);

        // connection.query(query)
        // .then(res => console.log(res.rows[0]))
        // .catch(e => console.error(e.stack))
        
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