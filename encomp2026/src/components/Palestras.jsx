import React, { useState, useEffect } from 'react';
const Palestras = () => {
  const [palestra, setPalestra] = useState([]);
  const [filtro, setFiltro] = useState({ data: "2026-10-26" });

  const buscaPalestra = async () => {
    const busca = await fetch('http://localhost:5000/BuscaPalestra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filtro)
    })
    const data = await busca.json();
    setPalestra(data);
  }
  const lidarComFiltro = (evento) => {
    setFiltro({ data: evento.target.value });
  };

  useEffect(() => {
    buscaPalestra();
  }, [filtro]);

  // Função que calcula o estilo do botão puxando as variáveis CSS
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
    <div className="row mt-5 mb-5 g-4 justify-content-center">
      <div className="col-12 text-center">
        <h1 className="fw-bold text-light mb-5">
          <span className="cor">{'{'}</span>
          Palestras
          <span className="cor">{'}'}</span>
        </h1>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
        <div>
          <input type="radio" className="btn-check" id="dia1" value="2026-10-26" onChange={lidarComFiltro} checked={filtro.data === "2026-10-26"} name="dia" />
          <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-26")} htmlFor="dia1">Segunda-feira</label>
        </div>
        <div>
          <input type="radio" className="btn-check" id="dia2" value="2026-10-27" onChange={lidarComFiltro} checked={filtro.data === "2026-10-27"} name="dia" />
          <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-27")} htmlFor="dia2">Terça-feira</label>
        </div>
        <div>
          <input type="radio" className="btn-check" id="dia3" value="2026-10-28" onChange={lidarComFiltro} checked={filtro.data === "2026-10-28"} name="dia" />
          <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-28")} htmlFor="dia3">Quarta-feira</label>
        </div>
        <div>
          <input type="radio" className="btn-check" id="dia4" value="2026-10-29" onChange={lidarComFiltro} checked={filtro.data === "2026-10-29"} name="dia" />
          <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-29")} htmlFor="dia4">Quinta-feira</label>
        </div>
        <div>
          <input type="radio" className="btn-check" id="dia5" value="2026-10-30" onChange={lidarComFiltro} checked={filtro.data === "2026-10-30"} name="dia" />
          <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-30")} htmlFor="dia5">Sexta-feira</label>
        </div>
      </div>

      {
        Array.isArray(palestra) && palestra.length > 0 ? (

          palestra.map((i) => (

            <div className='col-12 col-md-6 col-lg-4' key={i.id} >
              <div className="card bg-dark text-light h-100  p-3" style={{ border: '3px solid var(--cor8)' }}>

                <div className="card-body" id={i.id} >
                  <img src={"/" + i.foto} alt={i.foto} className='img-fluid w-100' style={{ height: '500px', objectFit: 'cover' }} />
                  <h4 className='card-title mt-3'>{i.nome}</h4>
                  <h6 className='card-text'>{i.palestrante}, {i.status}</h6>
                  <p className='card-text'>{i.descri}</p>
                </div>
                <ul className='list-group list-group-flush bg-transparent'>
                  <li className='list-group-item bg-transparent text-light'>Área: {i.tema}</li>
                  <li className='list-group-item bg-transparent text-light'>Data: {i.data ? new Date(i.data).toLocaleDateString('pt-BR') : "Não informada"}</li>
                  <li className='list-group-item bg-transparent text-light'>Hora: {i.horario ? new Date(i.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "Não informada"}</li>
                  <li className='list-group-item bg-transparent text-light'>Local: {i.local}</li>
                  <li className='list-group-item bg-transparent text-light'>Modalidade: {i.modalidade}</li>
                </ul>

              </div>
            </div>

          ))
        ) : (
          <p className='text-light'>Nenhuma palestra encontrada.</p>
        )
      }
    </div>
  )
}

export default Palestras