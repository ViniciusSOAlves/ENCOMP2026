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

      <main className="mb-5">
        <div className="row bg-black text-white p-5 rounded align-items-center mb-5">

          {/* TÍTULO DA SEÇÃO - Agora com < /> estilo tag de código */}
          <div className="col-12 text-center mb-5">
            <h1 className="titulo-secao-tag">
              <span className="cor">&lt;</span>
              História do ENCOMP
              <span className="cor">/&gt;</span>
            </h1>
          </div>

          {/* COLUNA DA IMAGEM (ESQUERDA) */}
          <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
            <img className="img-fluid p-3" src='logoBranca.png' alt="Logo ENCOMP" style={{ maxHeight: '380px' }} />
          </div>

          {/* COLUNA DO TEXTO COM ÍCONES (DIREITA) */}
          <div className="col-12 col-md-7">
            <div className="bloco-historia">

              {/* Parágrafo 1 */}
              <div className="item-historia mb-4">
                <p>
                  O Encontro de Computação (ENCOMP) surgiu em 2015 como uma iniciativa dos estudantes e professores do curso Bacharelado em Ciência da Computação do IFSULDEMINAS - Campus Passos, com o objetivo de aproximar a comunidade acadêmica do mercado de trabalho e das tendências tecnológicas.
                </p>
              </div>

              {/* Parágrafo 2 */}
              <div className="item-historia mb-4">

                <p>
                  Ao longo dos anos, o evento cresceu e se consolidou como uma das principais conferências de tecnologia da região, atraindo participantes de diversas instituições e profissionais renomados do setor.
                </p>
              </div>

              {/* Parágrafo 3 */}
              <div className="item-historia">

                <p>
                  Para 2026, o ENCOMP chega à sua 11ª edição com uma programação especial, trazendo temas inovadores como Inteligência Artificial, Cloud Computing, Edição de Vídeo e muito mais.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
      <footer class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App