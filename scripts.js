// script.js
document.getElementById('contato-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;

    // Enviar os dados para o banco de dados SQLite
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database.sqlite');

    db.run('INSERT INTO leads (nome, email) VALUES (?, ?)', [nome, email], function (err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Dados inseridos com sucesso!');
        }

        db.close();
    });
});
