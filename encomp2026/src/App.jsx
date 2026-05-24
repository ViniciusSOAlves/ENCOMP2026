import './App.css'
import Cursos from './components/Cursos'
import GerenciaCurso from './components/GerenciaCurso'

function App() {
  return (
    <>
      <header className="main-header">
        <img id='fundo' src='fundoheader.jpeg' alt="Imagem de Fundo" />

        <nav className="navbar">
          <div className="containerLogo">
            <img className="imagem_logo" src="/logoBranca.png" alt="Logo" />
            <div className="escritoEncomp">
              <p><span className='cor'>EN</span>COMP</p>
            </div>
          </div>

          <div className="navButtons">
            <button>Componente 1</button>
            <button>Componente 2</button>
            <button>Componente 3</button>
          </div>
        </nav>

        <div id="intro">
          <img className="logo-central" src='logoBranca.png' alt="Logo Central" />
          <h1 id='titulo-intro'><span className='cor'>EN</span>COMP 2026</h1>
          <div className="info-detalhes">
            <div className="item-info">
              <span className="icone-verde"></span>
              <p>26 a 30 de Outubro de 2026</p>
            </div>
            <div className="item-info">
              <span className="icone-verde"></span>
              <p>IFSULDEMINAS - Campus Passos</p>
            </div>
          </div>
        </div>
      </header>





























      <main className="mt-5 mb-5">
        <div className="row bg-black d-flex justify-content-between p-5">

          <div className="col-12 text-center">
            <h1 className="fw-bold text-light mb-5">
              <span className="cor">{'{'}</span>
              História do ENCOMP
              <span className="cor">{'}'}</span>
            </h1>
          </div>

          <div className="col-1">
          </div>
          <div className="col-3">
            <img className=" float-start" src="logoBranca.png" style={{ height: 'auto', width: '180px' }} />
          </div>

          <div className="col-7 text-start text-light ms-3 fs-18 w-50">
            <p  style={{ textAlign: 'justify'}}>
              O Encontro de Computação (ENCOMP) surgiu em 2015 como uma iniciativa dos estudantes e professores do curso Bacharelado em Ciência da Computação do IFSULDEMINAS - Campus Passos, com o objetivo de aproximar a comunidade acadêmica do mercado de trabalho e das tendências tecnológicas.
            </p>
            <p style={{ textAlign: 'justify'}}>
              Ao longo dos anos, o evento cresceu e se consolidou como uma das principais conferências de tecnologia da região, atraindo participantes de diversas instituições e profissionais renomados do setor.
            </p>
            <p style={{ textAlign: 'justify'}}>
              Para 2026, o ENCOMP chega à sua 11ª edição com uma programação especial, trazendo temas inovadores como Inteligência Artificial, Cloud Computing, Edição de Vídeo e muito mais.
            </p>
          </div>
          <div className="col-1">
          </div>

        </div>

      </main>







































      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        {/* <!-- Section: Social media --> */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* <!-- Left --> */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* <!-- Left --> */}

          {/* <!-- Right --> */}
          <div>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
          {/* <!-- Right --> */}
        </section>
        {/* <!-- Section: Social media --> */}

        {/* <!-- Section: Links  --> */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  Products
                </h6>
                <p>
                  <a href="#!" className="text-reset">Angular</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">React</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Vue</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Laravel</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  info@example.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
              </div>
              {/* <!/-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>



        <div className="text-center p-4 text-light" style={{ backgroundColor: "black" }}>
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </>
  )
}

export default App