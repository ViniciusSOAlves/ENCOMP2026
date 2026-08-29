require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();

// Middlewares
// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 10 * 60 * 1000
  }
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/FotosEquipe');
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato inválido! Envie apenas .jpeg ou .png.'), false);
    }
  }
});

const storagePalestra = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/FotosPalestras');
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPalestra = multer({
  storage: storagePalestra,

  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato inválido! Envie apenas .jpeg ou .png.'), false);
    }
  }
});

const storagePatrocinador = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/patrocinadores');
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPatrocinador = multer({
  storage: storagePatrocinador,

  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato inválido! Envie apenas .jpeg ou .png.'), false);
    }
  }
});

function verificarAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({
      error: "Acesso não autorizado."
    });
  }

  next();
}

app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  const user = "PAODEBATATAEBOM123";
  const senhaSegura = '$2b$10$JTySk0ZabCoYyBTlQFM5.eYc2pdbnIyIfl9WOyI4hBjRn4gWlQGi6';

  try {
    if (usuario !== user) {
      return res.status(401).json({
        error: "user ou senha incorretos."
      });
    }

    const senhaValida = await bcrypt.compare(senha, senhaSegura);

    if (!senhaValida) {
      return res.status(401).json({
        error: "user ou senha incorretos."
      });
    }

    // Cria a autenticação na sessão
    req.session.admin = true;

    return res.status(200).json({
      message: "Login de administrador aprovado!"
    });

  } catch (error) {
    console.error("Erro no login:", error);

    return res.status(500).json({
      error: "Erro interno no servidor."
    });
  }
});

app.get('/verificaAdmin', (req, res) => {
  if (req.session.admin) {
    return res.status(200).json({
      autenticado: true
    });
  }

  return res.status(401).json({
    autenticado: false
  });
});


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
    const dataBusca = data
      ? new Date(`${data}T00:00:00.000Z`)
      : undefined;

    const cursosRaw = await prisma.data_crono.findMany({
      where: {
        data: dataBusca
      },
      include: {
        curso: true
      }
    });

    const cursosFormatados = cursosRaw.map((dc) => ({
      horario: dc.HoraIni || dc.data,
      atividade: `Curso: ${dc.curso?.nome || 'Atividade sem nome'}`,
      LocalLink: dc.curso?.local || 'Não informado',
      formato: dc.curso?.tipo || 'Presencial'
    }));

    const palestrasRaw = await prisma.palestra.findMany({
      where: {
        data: dataBusca
      }
    });

    const palestrasFormatadas = palestrasRaw.map((p) => ({
      horario: p.horario || p.data,
      atividade: `Palestra: ${p.nome || 'Palestra sem nome'}`,
      LocalLink: p.local || 'Não informado',
      formato: p.modalidade || 'Presencial'
    }));

    const eventosExtrasRaw = await prisma.eventosExtras.findMany({
      where: {
        data: dataBusca
      }
    });

    const eventosExtrasFormatados = eventosExtrasRaw.map((e) => ({
      horario: e.horario || e.data,
      atividade: e.atividade || 'Atividade sem nome',
      LocalLink: e.local_link || 'Não informado',
      formato: e.formato
    }));

    const cronogramaUnificado = [
      ...cursosFormatados,
      ...palestrasFormatadas,
      ...eventosExtrasFormatados
    ];

    cronogramaUnificado.sort((a, b) => {
      const horaA = a.horario ? new Date(a.horario).getTime() : 0;
      const horaB = b.horario ? new Date(b.horario).getTime() : 0;

      return horaA - horaB;
    });

    return res.status(200).json(cronogramaUnificado);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno no servidor"
    });
  }
});

app.post("/eventosExtras", async (req, res) => {
  const { data } = req.body;

  try {
    const dataBusca = data
      ? new Date(`${data}T00:00:00.000Z`)
      : undefined;

    const eventosExtrasRaw = await prisma.eventosExtras.findMany({
      where: {
        data: dataBusca
      }
    });

    const eventosExtrasFormatados = eventosExtrasRaw.map((e) => ({
      id: e.id,
      horario: e.horario,
      atividade: e.atividade || 'Atividade sem nome',
      LocalLink: e.local_link || 'Não informado',
      formato: e.formato
    }));

    eventosExtrasFormatados.sort((a, b) => {
      const horaA = a.horario ? new Date(a.horario).getTime() : 0;
      const horaB = b.horario ? new Date(b.horario).getTime() : 0;

      return horaA - horaB;
    });

    return res.status(200).json(eventosExtrasFormatados);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno no servidor"
    });
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

app.post('/cadastroCurso', verificarAdmin, upload.single('foto'), async (req, res) => {
  const {
    nome,
    ministrantes,
    cargaHoraria,
    vagas,
    tipo,
    nivel,
    quantDias,
    local,
    linkInscricao,
    datas
  } = req.body;
  const datasArray = typeof datas === 'string' ? JSON.parse(datas) : datas;
  try {
    const newCurso = await prisma.cursos.create({
      data: {
        nome,
        ministrantes,
        cargahoraria: Number(cargaHoraria),
        vagas: Number(vagas),
        tipo,
        nivel,
        quantDias: Number(quantDias),
        local,
        linkInscricao,
        foto: req.file ? req.file.filename : null
      }
    });

    const horasPorDia = Number(cargaHoraria) / Number(quantDias);

    // Se vagas for 0 (online), começa às 19:30 (19.5), senão começa às 13:30 (13.5)
    const horaBase = Number(vagas) === 0 ? 19.5 : 13.5;
    const horaFimDecimal = horaBase + horasPorDia;

    // Strings formatadas
    const horaInicioStr = Number(vagas) === 0 ? "19:30:00" : "13:30:00";

    const fimHora = Math.floor(horaFimDecimal);
    const fimMinuto = (horaFimDecimal % 1 !== 0) ? "30" : "00";
    const horaFimStr = `${String(fimHora).padStart(2, '0')}:${fimMinuto}:00`;

    const idcurso = newCurso.id;

    for (let i = 0; i < (Number(quantDias)); i++) {
      const newDate = await prisma.data_crono.create({
        data: {
          data: new Date(`${datasArray[i]}T00:00:00Z`),
          HoraIni: new Date(`1970-01-01T${horaInicioStr}Z`),
          HoraFim: new Date(`1970-01-01T${horaFimStr}Z`),
          id_curso: idcurso
        }
      })
    }
    res.status(201).json({ message: 'Cadastro realizado!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erro no cadastro!' });
  }

});

app.post('/cadastraPalestra', verificarAdmin, uploadPalestra.single('foto'), async (req, res) => {
  const {
    nome,
    palestrante,
    status,
    tema,
    descri,
    data,
    hora,
    local,
    modalidade
  } = req.body;

  try {
    const newPalestra = await prisma.palestra.create({
      data: {
        nome,
        palestrante,
        foto: req.file ? req.file.filename : null,
        status,
        tema,
        descri,
        data: new Date(`${data}T00:00:00Z`),
        horario: new Date(`1970-01-01T${hora}:00Z`),
        local,
        modalidade
      }
    });

    res.status(201).json({ message: 'Cadastro realizado!' });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erro no cadastro!' });
  }
});

app.post('/cadastroPatrocinador', verificarAdmin, uploadPatrocinador.single('foto'), async (req, res) => {
  const { nome } = req.body;

  try {
    const newPatrocinador = await prisma.patrocinador.create({
      data: {
        nome,
        foto: req.file ? req.file.filename : null
      }
    });

    res.status(201).json({ message: 'Cadastro realizado!' });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erro no cadastro!' });
  }
});

app.post('/cadastraEventos', verificarAdmin, async (req, res) => {
  const {
    data,
    horario,
    atividade,
    formato,
    local_link
  } = req.body;

  try {
    const novoEvento = await prisma.eventosExtras.create({
      data: {
        data: new Date(`${data}T00:00:00Z`),
        horario: new Date(`1970-01-01T${horario}:00Z`),
        atividade,
        formato: formato || null,
        local_link: local_link || null
      }
    });

    res.status(201).json({
      message: 'Cadastro realizado!',
      evento: novoEvento
    });

  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: 'Erro no cadastro!'
    });
  }
});

app.delete("/deleteCurso", verificarAdmin, async (req, res) => {
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

app.delete("/deletePalestra", verificarAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await prisma.palestra.delete({
      where: { id: Number(id) }
    });

    res.json(result);
  } catch (err) {
    console.error("ERRO:", err);
    res.status(500).json({ erro: err.message });
  }
});

app.delete("/deletePatrocinador", verificarAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await prisma.patrocinador.delete({
      where: { id: Number(id) }
    });

    res.json(result);
  } catch (err) {
    console.error("ERRO:", err);
    res.status(500).json({ erro: err.message });
  }
});

app.delete("/deleteEventos", verificarAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await prisma.eventosExtras.delete({
      where: { id: Number(id) }
    });

    res.json(result);
  } catch (err) {
    console.error("ERRO:", err);
    res.status(500).json({ erro: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend vivo na porta ${PORT}`));