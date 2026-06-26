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
       <div className="row mt-5 mb-5 g-4">
          <div className="col-12 text-center">
                <h1 className="fw-bold text-light mb-5">
                    <span className="cor">{'{'}</span>
                    Patriocinador
                    <span className="cor">{'}'}</span>
                </h1>
            </div>

          {
            Array.isArray(patrio) && patrio.length > 0 ? (

              patrio.map((i) => (

                <div className='col-12 col-md-6 col-lg-4' key={i.id} >
                  <div className="card bg-dark text-light h-100  p-3" style={{border: '3px solid var(--cor8)'}}>

                    <div className="card-body" id={i.id} >
                      <img src={"/patrocinadores/" + i.foto} alt={i.foto} className='img-fluid w-100' style={{ height: '50px', objectFit: 'cover' }} />
                      <h4 className='card-title mt-3'>{i.nome}</h4>
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