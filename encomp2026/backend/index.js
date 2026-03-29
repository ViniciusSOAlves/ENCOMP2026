const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'rojeto_react'
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public')); // <- CORRETO
  },
  filename: (req, file, cb) => {
    if (!file) {
      return cb(new Error("Arquivo não enviado"));
    }
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/usuario", upload.single("fotoUp"), (req, res) => {
  try {
    const { nome, foto, descri, locate, data } = req.body;

    // 🔥 valida se o arquivo veio
    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    console.log("===== DADOS RECEBIDOS =====");
    console.log("Nome:", nome);
    console.log("Foto:", foto);
    console.log("Descrição:", descri);
    console.log("Localização:", locate);
    console.log("Data:", data);

    console.log("===== ARQUIVO =====");
    console.log(req.file);

    res.json({ mensagem: "Recebido com sucesso (com imagem)!" });

  } catch (err) {
    console.error("ERRO NO BACKEND:", err);
    res.status(500).json({ erro: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend vivo na porta ${PORT}`));