import React, { useState, useEffect } from 'react';
const Curso = () => {
    const [curso, setCurso] = useState([]);

    const buscaCurso = async () => {
        const busca = await fetch('http://localhost:5000/BuscaCurso', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await busca.json();
        setCurso(data);
    }

    useEffect(() => {
        buscaCurso();
    }, []);
    return (
        <div className="row mt-5 mb-5 g-4">
            <h1>Cursos</h1>
            {
                Array.isArray(curso) && curso.length > 0 ? (

                    curso.map((i) => (

                        <div className='col-12 col-md-4 col-lg-3' key={i.id} >
                            <div className="card bg-dark text-light h-100  p-3" style={{ border: '3px solid var(--cor8)' }}>

                                <div className="card-body" id={i.id} >
                                    <img src={"/" + i.foto} alt={i.foto} className='img-fluid rounded-start' />
                                    <h4 className='card-title'>{i.nome}</h4>
                                    <p className='card-text'>{i.descri}</p>
                                </div>
                                <ul className='lsit-group list-group-flush'>
                                    <li className='list-group-item'>Ministrantes: {i.ministrantes}</li>
                                    <li className='list-group-item'>Carga horária: {i.cargahoraria}</li>
                                    <li className='list-group-item'>Vagas: {i.vagas}</li>
                                    <li className='list-group-item'>Tipo: {i.tipo}</li>
                                </ul>

                            </div>
                        </div>

                    ))
                ) : (
                    <p className='text-light'>Nenhuma curso encontrada.</p>
                )
            }

        </div>
    )
}

export default Curso