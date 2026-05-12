import './App.css'
import Cursos from './components/Cursos'
import GerenciaCurso from './components/GerenciaCurso'
import Header from './components/Header'

function App() {
  return (
    <>
      <header>
        <img id='fundo' src='fundo.jpg' alt="Imagem de Fundo" />

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
          <img className="logo-central" src='logoBranca.png'></img>
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

      <main>
      </main>

      <footer>

      </footer>
    </>
  )
}

export default App