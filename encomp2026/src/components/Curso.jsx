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
              {/* CARD PRINCIPAL */}
              <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", overflow: "hidden" }}>
                
                {/* IMAGEM COM BADGE FLUTUANTE */}
                <div className="position-relative">
                  <img src={"/FotosEquipe/" + i.foto} alt={i.nome} className="img-fluid w-100 imagem-curso" style={{ borderBottom: '3px solid var(--cor8)' }} />
                  
                  {/* Badge Presencial / Online no canto superior esquerdo */}
                  <span 
                    className="badge position-absolute top-0 start-0 m-2 px-2 py-1" 
                    style={{ 
                      backgroundColor: i.tipo?.toLowerCase() === 'online' ? '#0dcaf0' : '#ffc107', 
                      color: '#000', 
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                    }}
                  >
                    {i.tipo?.toUpperCase()}
                  </span>
                </div>

                <div className="card-body p-3 p-md-4 text-light d-flex flex-column text-center">
                  
                  {/* TÍTULO DO CURSO */}
                  <h5 className="card-title fw-bold mb-3" style={{ color: 'var(--cor6)', fontSize: '1.15rem' }}>
                    {i.nome}
                  </h5>

                  {/* MINISTRANTES */}
                  <p className="small mb-2" style={{ color: '#dddddd' }}>
                    <span style={{ color: '#999999' }}>Ministrantes:</span> {i.ministrantes}
                  </p>

                  {/* CARGA HORÁRIA E VAGAS */}
                  <p className="small fw-bold mb-4" style={{ color: 'var(--cor6)', fontSize: '0.85rem' }}>
                    Carga: {i.cargahoraria}h <span className="mx-1" style={{ color: '#666666' }}>•</span> Vagas: {i.vagas == 0 ? 'Ilimitado' : i.vagas}
                  </p>

                  {/* DIAS DA SEMANA E HORÁRIOS RESTAURADOS */}
                  {i.datas_crono && i.datas_crono.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2" style={{ fontSize: '0.75rem', color: '#999999' }}>Datas e Horários</p>
                      
                      <div className="d-flex flex-column gap-2 align-items-center">
                        {i.datas_crono.map((crono) => {
                          const dataObj = new Date(crono.data);
                          const diaSemanaCompleto = dataObj.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' });
                          const diaSemanaCap = diaSemanaCompleto.charAt(0).toUpperCase() + diaSemanaCompleto.slice(1);
                          const diaMes = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).replace('.', '');
                          
                          // Convertendo os horários
                          const horaIni = new Date(crono.HoraIni).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                          const horaFim = new Date(crono.HoraFim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                          
                          return (
                            <span key={crono.id} className="badge rounded-pill w-100 py-2" style={{ border: '1px solid var(--cor8)', color: '#ffffff', backgroundColor: 'transparent', fontWeight: '500', fontSize: '0.8rem' }}>
                              {diaSemanaCap.split('-')[0]} ({diaMes}) <span style={{ color: 'var(--cor6)' }}>•</span> {horaIni} às {horaFim}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* BOTÃO DE INSCRIÇÃO RESTAURADO */}
                  <div className="mt-auto pt-3">
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