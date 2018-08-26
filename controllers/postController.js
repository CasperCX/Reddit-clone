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

            const { user_id, title, body, sub, file } = req.body;
            const result = await client.query('INSERT INTO posts(user_id, sub, title, body, file) VALUES($1, $2, $3, $4, $5) RETURNING *', [user_id, sub, title, body, file])
            res.send(result)
            
        client.end();
    },

    votePost : async function(req, res){
        const client = new Client(conString);
        client.connect(function(err) {
        if(err) {
            return res.send("could not connect to database");
        }
        });
        
        console.log("vote post put request body: ", req.body.calcvotes)
        const { id, calcvotes } = req.body
        //LOOK FOR CORRECT POST AND UPDATE THE VOTES
        
        const result = await client.query('UPDATE posts SET votes = ($1) WHERE id=($2) RETURNING *', [calcvotes, id]);
        //RETURN TE POST WITH UPDATED VALUES
        res.send(result)
        
        client.end();
    },

    uploadImage : async function(req, res){
        const client = new Client(conString);
        client.connect(function(err) {
        if(err) {
            return res.send("could not connect to database");
        }
        });

        console.log('file recieved: ', req.file)

        if (!req.file) {
            console.log("no file")
            return res.status(404).send({
                message: "no file provided",
                filePath: null
            })
        }

        res.status(200).send({
            message: "success",
            filePath: req.file.path
        })
    }
}

