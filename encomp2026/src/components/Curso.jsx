import React, { useState, useEffect } from "react";

const Curso = () => {
  const [curso, setCurso] = useState([]);
  const [filtro, setFiltro] = useState({ nivel: "Entusiasta" });

  const buscaCurso = async () => {
    const busca = await fetch("http://localhost:5000/BuscaCurso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtro),
    });
    const data = await busca.json();
    setCurso(data);
  };

  const lidarComFiltro = (evento) => setFiltro({ nivel: evento.target.value });

  useEffect(() => {
    buscaCurso();
  }, [filtro]);

  const estiloBotao = (nivelBotao) => {
    const isSelecionado = filtro.nivel === nivelBotao;
    return {
      color: isSelecionado ? "#ffffff" : "var(--cor6)",
      backgroundColor: isSelecionado ? "var(--cor8)" : "transparent",
      borderColor: "var(--cor6)",
      borderWidth: "1px",
      borderStyle: "solid",
      transition: "all 0.3s ease",
      cursor: "pointer",
    };
  };

  return (
    <div className="container py-5">

      {/* TÍTULO */}
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="fw-bold text-light m-0">
            <span className="cor" id="minicursos">{"{"}</span> Minicursos <span className="cor">{"}"}</span>
          </h1>
        </div>
      </div>

      {/* FILTROS */}
      <div className="row">
        <div className="col-12 mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
            {["Entusiasta", "Basico", "Intermediario", "Avancado"].map((nivelItem) => (
              <div key={nivelItem}>
                <input type="radio" className="btn-check" id={`nivel_${nivelItem}`} value={nivelItem} onChange={lidarComFiltro} checked={filtro.nivel === nivelItem} name="nivel" />
                <label className="btn rounded-pill px-3 px-md-4" style={estiloBotao(nivelItem)} htmlFor={`nivel_${nivelItem}`}>
                  {nivelItem === "Basico" ? "Básico" : nivelItem === "Intermediario" ? "Intermediário" : nivelItem === "Avancado" ? "Avançado" : nivelItem}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="row g-4 justify-content-center">
        {Array.isArray(curso) && curso.length > 0 ? (
          curso.map((i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={i.id}>
              <div className="card h-100 shadow-sm" style={{ border: "3px solid var(--cor8)", borderRadius: "15px", overflow: "hidden", backgroundColor: "#1e1e1e" }}>
                <div className="card-body p-3 text-light">
                  <img src={"/FotosEquipe/" + i.foto} alt={i.nome} className="img-fluid rounded mb-3 w-100 imagem-curso" />
                  <h4 className="card-title fw-bold text-center">{i.nome}</h4>

                  <ul className="list-group list-group-flush mt-3 px-0">
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Ministrantes:</strong> {i.ministrantes}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Carga horária:</strong> {i.cargahoraria}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Vagas:</strong> {i.vagas == 0 ? 'Ilimitado' : i.vagas}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Tipo:</strong> {i.tipo}
                    </li>
                    {i.datas_crono && i.datas_crono.length > 0 && (
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                        <strong>Datas:</strong>

                        <ul className="list-unstyled mb-0 mt-1 ps-2">
                          {i.datas_crono.map((crono) => (
                            <li key={crono.id}>
                              • {new Date(crono.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                              <span className="ms-2 text-secondary">
                                ({new Date(crono.HoraIni).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC'
                                })} - {new Date(crono.HoraFim).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC'
                                })})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                  </ul>
                  <div className="mt-4">

                    {i.linkInscricao && (
                      <a
                        href={i.linkInscricao?.startsWith('http') ? i.linkInscricao : `https://${i.linkInscricao}`}
                        className="btn w-100 fw-bold"
                        style={{ color: 'var(--cor5)' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Inscrever-se
                      </a>
                    )}

                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-light">Nenhum curso encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Curso;