import React, { useState, useEffect } from 'react';
const Palestras = () => {
    const [palestra, setPalestra] = useState([]);

    const buscaPalestra = async () => {
        const busca = await fetch('http://localhost:5000/BuscaPalestra', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await busca.json();
        setPalestra(data);
    }

    useEffect(() => {
        buscaPalestra();
    }, []);

    return (
       <div className="row mt-5 mb-5 g-4">
          <h1>Palestras</h1>
          {
            Array.isArray(palestra) && palestra.length > 0 ? (

              palestra.map((i) => (

                <div className='col-12 col-md-6 col-lg-4' key={i.id} >
                  <div className="card bg-dark text-light h-100  p-3" style={{border: '3px solid var(--cor8)'}}>

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