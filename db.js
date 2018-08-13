const { Pool, Client } = require('pg');
const connectionString = 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';

class DB {
    createPool() {
        const pool = new Pool({ connectionString: connectionString });
        
        pool.query('SELECT NOW()', (err, res) => {
            console.log(err, res)
        pool.end()
        });   
    }

    createClient() {
        const client = new Client({
            connectionString: connectionString,
        });

        client.query('SELECT NOW()', (err, res) => {
            console.log(err, res)
        client.end();
        });
        
        console.log("created client");
        return client;
    }

    connect(client) {
        client.connect((err) => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })
    }
}

module.exports = DB;


  
   

