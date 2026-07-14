import React from 'react'

const SobreIF = () => {
    return (
        <div className="row g-4 justify-content-center">
            <div className="col-12 text-center">
                <h1 className="fw-bold text-light mb-5">
                    <span className="cor">{'{'}</span>
                    Sobre IF
                    <span className="cor">{'}'}</span>
                </h1>
            </div>
       

            <div className="col-4">
                <img className=" float-start" src="Logo_if.png" style={{ height: 'auto', width: '360px' }} />
            </div>

            <div className="col-8 text-start text-light ms-3 fs-18 w-50">
                <p style={{ textAlign: 'justify' }}>
                    O Instituto Federal de Educação, Ciência e Tecnologia do Sul de Minas Gerais - Campus Passos é referência na 
                    área de computação, com professores dedicados e estrutura moderna. Fiel à sua tradição como anfitrião do ENCOMP, 
                    segue oferecendo estrutura, tecnologia e acolhimento aos participantes.
                </p>
                <p style={{ textAlign: 'justify' }}>
                    O campus possui laboratórios e auditório modernos e toda a infraestrutura necessária para proporcionar uma experiência
                     enriquecedora aos participantes do evento.
                </p>
                <p style={{ textAlign: 'justify' }}>
                    Além disso, o IFSULDEMINAS - Campus Passos está situado em uma localização privilegiada na cidade, com fácil acesso.
                </p>
            </div>


        </div>
    )
}

export default SobreIF