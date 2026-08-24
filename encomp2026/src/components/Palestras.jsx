import React, { useState, useEffect } from 'react';

const Palestras = () => {
  const [palestra, setPalestra] = useState([]);
  const [filtro, setFiltro] = useState({ data: "2026-10-26" });

  const buscaPalestra = async () => {
    const busca = await fetch('http://localhost:5000/BuscaPalestra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filtro)
    })
    const data = await busca.json();
    setPalestra(data);
  }

  const lidarComFiltro = (evento) => setFiltro({ data: evento.target.value });

  useEffect(() => {
    buscaPalestra();
  }, [filtro]);

  const estiloBotao = (dataBotao) => {
    const isSelecionado = filtro.data === dataBotao;
    return {
      color: isSelecionado ? '#ffffff' : 'var(--cor6)',
      backgroundColor: isSelecionado ? 'var(--cor8)' : 'transparent',
      borderColor: 'var(--cor6)',
      borderWidth: '1px',
      borderStyle: 'solid',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    };
  };

  return (
    <div className="container py-5">

      {/* TÍTULO */}
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="fw-bold text-light m-0">
            <span className="cor" id='palestras'>{'{'}</span> Palestras <span className="cor">{'}'}</span>
          </h1>
        </div>
      </div>

      {/* FILTROS */}
      <div className="row">
        <div className="col-12 mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
            {["2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30"].map((data, index) => {
              const dias = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
              return (
                <div key={data}>
                  <input type="radio" className="btn-check" id={`diaPalestra${index}`} value={data} onChange={lidarComFiltro} checked={filtro.data === data} name="diaPalestra" />
                  <label className="btn rounded-pill px-3 px-md-4" style={estiloBotao(data)} htmlFor={`diaPalestra${index}`}>
                    {dias[index]}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="row g-4 justify-content-center">
        {Array.isArray(palestra) && palestra.length > 0 ? (
          palestra.map((i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i.id}>
              <div className="card h-100 shadow-sm" style={{ border: "3px solid var(--cor8)", borderRadius: "15px", overflow: "hidden", backgroundColor: "#1e1e1e" }}>
                <div className="card-body p-3 text-light" id={i.id}>
                  <img src={"/FotosPalestras/" + i.foto} alt={i.foto} className='img-fluid rounded mb-3 w-100 imagem-palestra' />
                  <h4 className="card-title fw-bold text-center">{i.nome}</h4>
                  <p className="card-text text-center text-muted small mb-2">{i.palestrante} • {i.status}</p>
                  <p className="card-text  text-center small mb-3">{i.descri}</p>

                  <ul className="list-group list-group-flush mt-auto px-0">
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Área:</strong> {i.tema}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Data:</strong> {i.data ? new Date(i.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Não informada"}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Hora:</strong> {i.horario ? new Date(i.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "Não informada"}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                      <strong style={{ color: 'var(--cor6)' }}>Local:</strong> {i.local}
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2 mb-0 border-bottom-0">
                      <strong style={{ color: 'var(--cor6)' }}>Modalidade:</strong> {i.modalidade}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-light">Nenhuma palestra encontrada.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Palestras;