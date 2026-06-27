import React, { useState, useEffect } from 'react';

const Patrocinadores = () => {
    const [patrio, setPatrio] = useState([])
    
        const buscaPatriocinador = async () => {
            const busca = await fetch('http://localhost:5000/patrocinador', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await busca.json();
            setPatrio(data);
        }
    
        useEffect(() => {
            buscaPatriocinador();
        }, []);

  return (
       <div className="row g-4 justify-content-center mt-4">
          <div className="col-12 text-center">
                <h1 className="fw-bold text-light mb-5">
                    <span className="cor">{'{'}</span>
                    Patrocinadores
                    <span className="cor">{'}'}</span>
                </h1>
            </div>

          {
            Array.isArray(patrio) && patrio.length > 0 ? (

              patrio.map((i) => (

                <div className='col-auto' key={i.id} >
                  <div className="card bg-dark text-light p-1" style={{border: '3px solid var(--cor8)'}}>

                    <div className="card-body p-1 text-center" id={i.id} >
                      <img src={"/patrocinadores/" + i.foto} alt={i.foto} className='img-fluid' style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                      <h6 className='card-title mt-1 mb-0' style={{ fontSize: '0.75rem' }}>{i.nome}</h6>
                    </div>
                  </div>
                </div>

              ))
            ) : (
              <p className='text-light'>Nenhum Patriocinador Encontrado.</p>
            )
          }
        </div>
    )
}

export default Patrocinadores