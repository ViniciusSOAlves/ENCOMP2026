import React from 'react'

const Equipe = () => {
    return (
        <div className="container py-5">
            {/* TÍTULO */}
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1 className="fw-bold text-light m-0">
                        <span className="cor">{'{'}</span> Equipe <span className="cor">{'}'}</span>
                    </h1>
                </div>
            </div>

            {/* CONTEÚDO */}
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <img src="/FotosEquipe/equipe.jpeg" className="img-fluid w-100 rounded shadow" style={{ maxWidth: '1100px' }} alt="fotoEquipe" />
                </div>
            </div>
        </div>
    )
}

export default Equipe;