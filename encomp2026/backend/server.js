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
app.post("/BuscaCurso", async (req, res) => {
  const { nivel } = req.body;
  try {
    const search = await prisma.cursos.findMany({
      where: {
        nivel: nivel
      },
      include: {
        datas_crono: {
          orderBy: {
            data: 'asc', // Ordena as datas do curso em ordem cronológica
          },
        },
      },
    });

    return res.status(200).json(search);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno" });
  }
});

app.post("/BuscaPalestra", async (req, res) => {
  const { data } = req.body;
  try {
    const search = await prisma.palestra.findMany({
      where: { data: data ? new Date(`${data}T00:00:00.000Z`) : undefined }
    });

    return res.status(200).json(search);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno" });
  }
});

app.post("/Cronograma", async (req, res) => {
  const { data } = req.body;

  try {
    const dataBusca = data ? new Date(`${data}T00:00:00.000Z`) : undefined;

    const cursosRaw = await prisma.data_crono.findMany({
      where: { data: dataBusca },
      include: {
        curso: true
      }
    });

    const cursosFormatados = cursosRaw.map((dc) => ({
      horario: dc.HoraIni || dc.data,
      atividade: dc.curso?.nome || 'Atividade sem nome',
      LocalLink: dc.curso?.local || 'Não informado',
      formato: dc.curso?.tipo || 'Presencial'
    }));

    const palestrasRaw = await prisma.palestra.findMany({
      where: { data: dataBusca }
    });

    const palestrasFormatadas = palestrasRaw.map((p) => ({
      horario: p.horario || p.data,
      atividade: p.nome || 'Palestra sem nome',
      LocalLink: p.local || 'Não informado',
      formato: p.modalidade || 'Presencial'
    }));

    const cronogramaUnificado = [...cursosFormatados, ...palestrasFormatadas];

    cronogramaUnificado.sort((a, b) => {
      const horaA = a.horario ? new Date(a.horario).getTime() : 0;
      const horaB = b.horario ? new Date(b.horario).getTime() : 0;
      return horaA - horaB;
    });

    return res.status(200).json(cronogramaUnificado);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.get("/patrocinador", async (req, res) => {
  try {
    const search = await prisma.patrocinador.findMany({
      orderBy: {
        nome: 'asc'
      }
    });

    return res.status(200).json(search);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Backend vivo na porta ${PORT}`));