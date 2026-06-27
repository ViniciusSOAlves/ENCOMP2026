import React, { useState, useEffect } from 'react';
const Curso = () => {
    const [curso, setCurso] = useState([]);
    const [filtro, setFiltro] = useState({ nivel: "Entusiasta" });
    const buscaCurso = async () => {
        const busca = await fetch('http://localhost:5000/BuscaCurso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filtro)
        })
        const data = await busca.json();
        setCurso(data);
    }
    const lidarComFiltro = (evento) => {
        setFiltro({ nivel: evento.target.value });
    };

    useEffect(() => {
        buscaCurso();
    }, [filtro]);

    const estiloBotao = (nivelBotao) => {
        const isSelecionado = filtro.nivel === nivelBotao;
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
                    Minicursos
                    <span className="cor">{'}'}</span>
                </h1>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                <div>
                    <input type="radio" className="btn-check" id="nivel1" value="Entusiasta" onChange={lidarComFiltro} checked={filtro.nivel === "Entusiasta"} name="nivel" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("Entusiasta")} htmlFor="nivel1">Entusiasta</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="nivel2" value="Basico" onChange={lidarComFiltro} checked={filtro.nivel === "Basico"} name="nivel" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("Basico")} htmlFor="nivel2">Básico</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="nivel3" value="Medio" onChange={lidarComFiltro} checked={filtro.nivel === "Medio"} name="nivel" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("Medio")} htmlFor="nivel3">Medio</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="nivel4" value="Avancado" onChange={lidarComFiltro} checked={filtro.nivel === "Avancado"} name="nivel" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("Avancado")} htmlFor="nivel4">Avançado</label>
                </div>
            </div>

            {
                Array.isArray(curso) && curso.length > 0 ? (

                    curso.map((i) => (

                        <div className='col-12 col-md-4 col-lg-3 ' key={i.id} >
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