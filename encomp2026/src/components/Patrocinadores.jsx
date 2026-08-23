import React, { useState, useEffect } from 'react';

const Patrocinadores = () => {
    const [patrio, setPatrio] = useState([])
    
    const buscaPatriocinador = async () => {
        const busca = await fetch('http://localhost:5000/patrocinador', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await busca.json();
        setPatrio(data);
    }

    useEffect(() => {
        buscaPatriocinador();
    }, []);

    return (
       <div className="container py-5">
           
           {/* TÍTULO */}
           <div className="row">
              <div className="col-12 text-center mb-5">
                    <h1 className="fw-bold text-light m-0">
                        <span className="cor">{'{'}</span> Patrocinadores <span className="cor">{'}'}</span>
                    </h1>
              </div>
           </div>

           {/* CONTEÚDO */}
           <div className="row g-4 justify-content-center">
              {Array.isArray(patrio) && patrio.length > 0 ? (
                patrio.map((i) => (
                  <div className='col-6 col-md-4 col-lg-auto d-flex justify-content-center' key={i.id} >
                    <div className="card bg-dark text-light p-2 w-100" style={{ border: '3px solid var(--cor8)', maxWidth: '180px' }}>
                      <div className="card-body p-1 text-center d-flex flex-column align-items-center" id={i.id}>
                        <img src={"/patrocinadores/" + i.foto} alt={i.foto} className='img-fluid rounded' style={{ width: '100%', height: '120px', objectFit: 'contain' }} />
                        <h6 className='card-title mt-2 mb-0' style={{ fontSize: '0.85rem' }}>{i.nome}</h6>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                   <p className='text-light'>Nenhum Patrocinador Encontrado.</p>
                </div>
              )}
            </div>
        </div>
    )
}

export default Patrocinadores;