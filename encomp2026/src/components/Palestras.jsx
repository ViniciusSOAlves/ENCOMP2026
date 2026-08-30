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
            <div className="col-12 col-sm-6 col-lg-3" key={i.id}>
              {/* CARD PRINCIPAL MAIS COMPACTO */}
              <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", overflow: "hidden" }}>
                
                <div className="card-body p-3 text-light d-flex flex-column align-items-center text-center" id={i.id}>
                  
                  {/* FOTO REDONDA MENOR (100px) */}
                  <div className="mb-2">
                    <img 
                      src={"/FotosPalestras/" + i.foto} 
                      alt={i.palestrante} 
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '2px solid var(--cor8)',
                        backgroundColor: '#1e1e1e',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
                      }} 
                    />
                  </div>

                  {/* NOME DO PALESTRANTE */}
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--cor6)', fontSize: '1rem' }}>
                    {i.palestrante}
                  </h6>
                  
                  {/* STATUS / TIPO */}
                  <p className="small mb-2" style={{ color: '#999999', fontSize: '0.8rem' }}>
                    {i.status}
                  </p>

                  {/* BADGE (Tema/Área) */}
                  <span className="badge rounded-pill mb-3 px-3 py-1 w-100 text-truncate" style={{ backgroundColor: 'var(--cor8)', color: '#ffffff', fontWeight: '500', fontSize: '0.75rem' }}>
                    {i.tema}
                  </span>

                  {/* TÍTULO DA PALESTRA */}
                  <p className="fw-bold mb-1 text-light" style={{ fontSize: '0.9rem' }}>
                    {i.nome}
                  </p>

                  {/* DESCRIÇÃO CURTA */}
                  <p className="small mb-3 flex-grow-1" style={{ color: '#cccccc', fontSize: '0.8rem', lineHeight: '1.3' }}>
                    {i.descri}
                  </p>

                  {/* LINHA SEPARADORA */}
                  <hr className="w-100 border-secondary opacity-25 my-2" />

                  {/* DATA, HORA E LOCAL */}
                  <div className="w-100 mt-auto">
                    <p className="mb-1 fw-bold" style={{ color: 'var(--cor6)', fontSize: '0.85rem' }}>
                      {i.data ? new Date(i.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Não informada"}
                    </p>
                    <p className="mb-1 text-light" style={{ fontSize: '0.8rem' }}>
                      Início: {i.horario ? new Date(i.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) : "Não informada"}
                    </p>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                      {i.modalidade} ({i.local})
                    </p>
                  </div>

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