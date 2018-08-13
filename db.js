const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
  query: (text, params) => pool.query(text, params)
}
// const { Pool, Client } = require('pg');
// const connectionString = 'postgres://ouxzkgpl:lAtm9CkJUJaJZQGth7ZgzNJsGiXJi18S@dumbo.db.elephantsql.com:5432/ouxzkgpl';

// class DB {
//     createPool() {
//         const pool = new Pool({ connectionString: connectionString });
        
//         pool.query('SELECT NOW()', (err, res) => {
//             // if (err) {
//             //     console.log(err) 
//             // }
//             // if (res) {
//             //     console.log(res)
//             // }
//         pool.end()
//         }); 
//     }

//     createClient() {
//         const client = new Client({
//             connectionString: connectionString,
//         });

//         client.query('SELECT NOW()', (err, res) => {
//             // if (err) {
//             //     console.log(err) 
//             // }
//             // if (res) {
//             //     console.log(res)
//             // }
//         client.end();
//         });
        
//         console.log("created client");
//         return client;
//     }

//     connect(client) {
//         client.connect((err) => {
//             if (err) {
//                 console.error('connection error', err.stack)
//             } else {
//                 console.log('connected')
//             }
//         })

//         return client;
//     }
// }

// const db_instance = new DB();
// const pool = db_instance.createPool();
// const client = db_instance.createClient();
// const connection = db_instance.connect(client);

// // module.exports = pool;
// module.exports = connection;



  
   

