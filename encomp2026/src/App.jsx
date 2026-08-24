import { useEffect, useState } from 'react'
import './App.css'
import Cronograma from './components/Cronograma'
import Palestras from './components/Palestras'
import Curso from './components/Curso'
import Patrocinadores from './components/Patrocinadores'
import Acordeon from './components/Acordeon'
import Equipe from './components/Equipe'
import SobreIF from './components/SobreIF'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [cliques, setCliques] = useState(0);

  const acessarLogin = () => {
    const novosCliques = cliques + 1;

    if (novosCliques === 5) {
      navigate("/login");
      setCliques(0);
    } else {
      setCliques(novosCliques);
    }
  };
  return (
    <>
      <header className="main-header position-relative">

        <img
          id="fundo"
          src="fundoheader.jpeg"
          alt="Imagem de Fundo"
        />
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100" style={{ zIndex: 9999 }}>
          <div className="container-fluid">

            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img
                src="/logoBranca.png"
                alt="Logo"
                width="50"
                className="me-3"
              />
              <span className="fw-bold">
                <span className="cor">EN</span>COMP
              </span>
            </a>

            {/* Botão Hambúrguer */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menu */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              {/* Adicionado fundo escuro e padding apenas no mobile (lg) para melhor leitura */}
              <ul className="navbar-nav gap-2 text-center bg-lg-transparent rounded p-3 p-lg-0 mt-2 mt-lg-0 shadow-lg shadow-lg-none">
                <li className="nav-item">
                  <a className="nav-link menu-link" href="#Programacao">Programação</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link menu-link" href="#palestras">Palestras</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link menu-link" href="#minicursos">Minicursos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link menu-link" href="#faq">FAQ</a>
                </li>
              </ul>
            </div>

          </div>
        </nav>


        {/* INTRO - zIndex 1 para garantir que fique sempre abaixo da navbar */}
        <div
          id="intro"
          className="position-absolute start-50 translate-middle w-100 text-center d-flex flex-column align-items-center"
          style={{ zIndex: 1 }}
        >

          <img
            className="logo-central"
            src="logoBranca.png"
            alt="Logo Central"
          />

          <h1 id="titulo-intro">
            <span className="cor">EN</span>COMP 2026
          </h1>

          <div className="info-detalhes d-flex flex-wrap justify-content-center align-items-center gap-4 mt-3">
            <div className="item-info d-flex align-items-center gap-2">
              <span className="icone-verde"></span>
              <p className="mb-0">26 a 30 de Outubro de 2026</p>
            </div>
            <div className="item-info d-flex align-items-center gap-2">
              <span className="icone-verde"></span>
              <p className="mb-0">IFSULDEMINAS - Campus Passos</p>
            </div>
          </div>

        </div>

      </header>


      <main className="overflow-hidden">

        <div className="container py-5">
          <div className="row bg-black d-flex justify-content-between p-5">
            <div className="col-12 text-center">
              <h1 className="fw-bold text-light mb-5">
                <span className="cor">{'{'}</span>História do ENCOMP<span className="cor">{'}'}</span>
              </h1>
            </div>

            <div className="col-12 col-md-3 order-2 order-md-1 d-none d-md-flex justify-content-center align-items-start">
              <img
                src="logoBranca.png"
                style={{ height: 'auto', width: '180px' }}
                className="img-fluid"
                alt="Logo Encomp"
              />
            </div>

            <div className="col-12 col-md-7 order-1 order-md-2 text-start text-light">
              <p style={{ textAlign: 'justify' }}>
                O Encontro de Computação (ENCOMP) surgiu em 2015 como uma iniciativa dos estudantes e professores do curso Bacharelado em Ciência da Computação do IFSULDEMINAS - Campus Passos, com o objetivo de aproximar a comunidade acadêmica do mercado de trabalho e das tendências tecnológicas.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Ao longo dos anos, o evento cresceu e se consolidou como uma das principais conferências de tecnologia da região, atraindo participantes de diversas instituições e profissionais renomados do setor.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Para 2026, o ENCOMP chega à sua 12ª edição com uma programação especial, trazendo temas inovadores como Inteligência Artificial, Cloud Computing, Edição de Vídeo e muito mais.
              </p>
            </div>
          </div>
        </div>


        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <SobreIF />

        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <Cronograma />

        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <Palestras />

        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <Curso />

        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <Equipe />

        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <Patrocinadores />

        <hr className="mx-auto" style={{ borderColor: 'var(--cor6)', opacity: 1, borderWidth: '1px', width: '95%' }} />
        <Acordeon />

      </main>


      <footer className="text-center text-lg-start bg-body-tertiary bg-dark">
        <section className="bg-dark text-light pt-5 mt-5">
          <div className="container text-center text-md-start">
            <div className="row">

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-light">
                  <i className="fas fa-gem"></i> ENCOMP 2026
                </h6>
                <p>
                  O maior evento de computação do Sul de Minas Gerais. Palestras, minicursos, campeonato de League of Legends e muito mais!
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4" style={{ color: 'var(--cor5)' }}>
                <h6 className="text-uppercase fw-bold mb-4 text-light">Redes Sociais</h6>
                <p><i className="bi bi-instagram"></i></p>
                <p><i className="bi bi-whatsapp"></i></p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-light">Contato</h6>
                <p>IFSULDEMINAS - Campus Passos</p>
                <p>Rua da Penha, 290 - Penha II</p>
                <p>Passos - MG, 37903-070</p>
                <p>janaina.leite@ifsuldeminas.edu.br</p>
                <p>(35) 3526-4856</p>
              </div>

            </div>
          </div>
        </section>

        <div className="text-center p-4 text-light" style={{ backgroundColor: "black" }}>
          © 2026 Copyright:
          Alunos do curso Bacharelado em Ciência da Computação -{" "}
          <span
            onClick={acessarLogin}
            style={{ cursor: "default" }}
          >
            5°/6° período
          </span>
        </div>
      </footer>
    </>
  )
}

export default App