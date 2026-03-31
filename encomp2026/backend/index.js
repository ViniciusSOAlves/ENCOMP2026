const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

app.post("/usuario", upload.single("fotoUp"), async (req, res) => {
  try {
    const { nome, foto, descri, locate, dataAc } = req.body;

    //valida se o arquivo veio
    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    console.log("===== ARQUIVO =====");
    console.log(req.file);

    const novo = await prisma.cursos.create({
      data: {
        nome,
        foto,
        descricao: descri,
        dataAc: new Date(dataAc),
        locate
      }
    });

    res.json(novo);


  } catch (err) {
    console.error("ERRO NO BACKEND:", err);
    res.status(500).json({ erro: err.message });
  }
});

app.get("/lista", async (req, res) => {
  try {
    const result = await prisma.cursos.findMany();
    res.json(result);
  } catch (err) {
    console.error("ERRO:", err);
    res.status(500).json({ erro: err.message });
  }
});
app.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await prisma.cursos.delete({
      where: { id: Number(id) }
    });

    res.json(result);
  } catch (err) {
    console.error("ERRO:", err);
    res.status(500).json({ erro: err.message });
  }
});
/* 
app.update("/utualiza", async (req, res) => {
  try {
    const {id, nome, foto, descri, locate, dataAc } = req.body;
    const result = await prisma.cursos.update({
      where: { id: Number(id)},
      data: {
        nome: nome,
        foto: foto,
        descricao: descri,
        dataAc: new Date(dataAc),
        locate: locate
      }
    });
    res.json(result);
  } catch (err) {
    console.error("ERRO:", err);
    res.status(500).json({ erro: err.message });
  }
});

*/

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend vivo na porta ${PORT}`));