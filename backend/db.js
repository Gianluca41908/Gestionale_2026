const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'gestionale_node'
})

db.connect((err) => {
    if (err) {
        console.error('Errore connessione:', err)
    } else {
        console.log('Connesso a MySQL')
    }
})

module.exports = db