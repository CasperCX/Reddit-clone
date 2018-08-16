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




// CREATE TABLE cities (
//     city     varchar(80) primary key,
//     location point
// );

// CREATE TABLE weather (
//     city      varchar(80) references cities(city),
//     temp_lo   int,
//     temp_hi   int,
//     prcp      real,
//     date      date
// );

// CREATE TABLE posts(
//     id serial PRIMARY KEY references comments(id),
//     title VARCHAR (50) NOT NULL,
//     body VARCHAR (50) NOT NULL
//    );





// DROP TABLE posts CASCADE
// DROP TABLE post_id;
// DROP TABLE comments;
// DROP TABLE posts;
// DROP TABLE users;

// //postgres
// CREATE TABLE users (
//     userid serial PRIMARY KEY,
//     username VARCHAR (30) UNIQUE,
//     password VARCHAR (30) NOT NULL,
//     karma int DEFAULT 1
// );

// CREATE TABLE post_id (post_index serial PRIMARY KEY);
// CREATE TABLE posts (post_index serial PRIMARY KEY REFERENCES post_id);


// CREATE TABLE comments (
//     comment_id int PRIMARY KEY,
//     post_id serial NOT NULL REFERENCES posts,
//     userid int NOT NULL REFERENCES users,
//     comment VARCHAR (300) NOT NULL,
//     votes int DEFAULT 1
// );


// ALTER TABLE posts ADD COLUMN parent_post int REFERENCES posts;
// ALTER TABLE posts ADD COLUMN userid int NOT NULL REFERENCES users;
// ALTER TABLE posts ADD COLUMN title VARCHAR (30) NOT NULL;
// ALTER TABLE posts ADD COLUMN body VARCHAR (500) NOT NULL;
// ALTER TABLE posts ADD COLUMN votes int;
// ALTER TABLE posts ADD COLUMN comment_id int REFERENCES comments(comment_id);



// INSERT INTO posts(userid, title, body)
// VALUES
//  (1, 'title1', 'bodyhere');








// CREATE TABLE posts (
//     post_id serial PRIMARY KEY,
//     votes int DEFAULT 1,
//     parent_post int REFERENCES posts,
//     authorid int NOT NULL REFERENCES author,
//     title VARCHAR (30) NOT NULL,
//     body VARCHAR (500) NOT NULL,
//     comment_id int[] REFERENCES comments
// );


// CREATE TABLE methods
// (
//     method_id serial PRIMARY KEY,
//     method_name varchar(100)
// );

// //I now want to create a table with the following columns:

// CREATE TABLE experiments 
// (
//     method integer[] REFERENCES methods(method_id),
//     trials integer
// );


// CREATE TABLE experiments (
//     method_id integer REFERENCES methods (method_id),
//     method_class_id integer REFERENCES method_class (method_class_id)
// );