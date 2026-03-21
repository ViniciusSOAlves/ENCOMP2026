const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middlewares
app.use(cors()); // Permite que o React aceda a esta API
app.use(express.json()); // Permite que o servidor entenda JSON

/// ... (suas configurações de express, cors e mysql acima)

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'rojeto_react' // O nome que criaste no phpMyAdmin
});

// EXEMPLO DE SQL EM NODE
app.post('/api/palestrantes', (req, res) => {
    const { nome, tema, bio } = req.body; // Pega os dados vindos do formulário
    
    const sql = "INSERT INTO palestrantes (nome, tema, bio) VALUES (?, ?, ?)";
    
    db.query(sql, [nome, tema, bio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Palestrante registrado com sucesso!", id: result.insertId });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend vivo na porta ${PORT}`));
