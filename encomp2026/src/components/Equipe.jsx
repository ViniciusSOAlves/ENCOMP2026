import React from 'react'

const Equipe = () => {
    return (
        <div className="row g-4 justify-content-center">
            <div className="col-12 text-center">
                <h1 className="fw-bold text-light mb-5">
                    <span className="cor">{'{'}</span>
                    Equipe
                    <span className="cor">{'}'}</span>
                </h1>
            </div>
            <div className="col-12 text-center">
                <img src="/FotosEquipe/equipe.jpeg" class="img-fluid w-50" alt="fotoEquipe" />
            </div>

        </div>
    )
}

export default Equipe