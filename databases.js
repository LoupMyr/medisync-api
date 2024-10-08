const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '10.60.12.67',
    user: 'medisync',
    password: 'Sf5Jkbse6NyMB7FhEQVQxYsZZMiijav2',
    database: 'medisync',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MariaDB');
});

module.exports = db;