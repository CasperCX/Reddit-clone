// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['brianc', 'brian.m.carlson@gmail.com']


// SELECT * FROM posts;
// DROP TABLE posts CASCADE;

// INSERT INTO posts(title, body)
// VALUES
//  ('title1', 'bodyhere');

// //postgres
// CREATE TABLE users (
//     user_id serial PRIMARY KEY,
//     username VARCHAR (30) UNIQUE,
//     password TEXT NOT NULL,
//     karma int DEFAULT 1
// );
   
// CREATE TABLE comments (
//     comment_id serial PRIMARY KEY,
//     post_id INTEGER NOT NULL REFERENCES posts,
//     user_id int NOT NULL REFERENCES users,
//     comment VARCHAR (300) NOT NULL,
//     votes INTEGER DEFAULT 1
// );

// CREATE TABLE posts(
//     id serial PRIMARY KEY,   //REFERENCES comments(post_id),
//     user_id INTEGER NOT NULL REFERENCES users(user_id),
//     username VARCHAR (50) NOT NULL,
//     posting_date TIMESTAMPTZ DEFAULT now(),
//     sub VARCHAR (50) NOT NULL,
//     votes INTEGER DEFAULT 1,
//     title VARCHAR (50) NOT NULL,
//     body VARCHAR (50) NOT NULL,
//     file VARCHAR DEFAULT NULL
//    );







// DROP TABLE posts CASCADE
// DROP TABLE post_id;
// DROP TABLE comments;
// DROP TABLE posts;
// DROP TABLE users;



// CREATE TABLE post_id (post_index serial PRIMARY KEY);
// CREATE TABLE posts (post_index serial PRIMARY KEY REFERENCES post_id);



// ALTER TABLE posts ADD COLUMN parent_post int REFERENCES posts;
// ALTER TABLE posts ADD COLUMN userid int NOT NULL REFERENCES users;
// ALTER TABLE posts ADD COLUMN title VARCHAR (30) NOT NULL;
// ALTER TABLE posts ADD COLUMN body VARCHAR (500) NOT NULL;
// ALTER TABLE posts ADD COLUMN votes int;
// ALTER TABLE posts ADD COLUMN comment_id int REFERENCES comments(comment_id);



// INSERT INTO posts(userid, title, body)
// VALUES
//  (1, 'title1', 'bodyhere');

// INSERT INTO users(username, password)
// VALUES
//  ('userone', 'password');







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