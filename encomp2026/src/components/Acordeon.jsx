import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Acordeon = () => {
    return (
        <>
            <div className="col-12 mt-5 text-center">
                <h1 className="fw-bold text-light mb-5">
                    <span className="cor">{'{'}</span>
                    FAQ
                    <span className="cor">{'}'}</span>
                </h1>
            </div>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">

                        <div className="accordion bg-dark" id="acordeonEncomp">
                            <style>{`
                                #acordeonEncomp .accordion-button::after {
                                    filter: invert(1) brightness(2);
                                }
                            `}</style>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        O que é o ENCOMP?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <p>É um evento gratuito focado em computação com palestras, cursos, convidados e muito mais. O ENCOMP reúne estudantes, profissionais e entusiastas da área de tecnologia para compartilhar conhecimentos e experiências.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Preciso pagar algo?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <p>Não! O ENCOMP é 100% gratuito. Todas as palestras, workshops e atividades são oferecidos de forma gratuita aos participantes.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Onde será realizado?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <p>No Instituto Federal do Sul de Minas - Campus Passos, R. da Penha, 290 - Penha II, Passos - MG, 37903-070. O evento também terá momentos online com minicursos pra você fazer da sua casa.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Preciso me inscrever com antecedência?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <p>Sim, recomendamos que você se inscreva com antecedência para garantir sua vaga, pois temos um número limitado de participantes. A inscrição pode ser feita diretamente no site do evento</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingFive">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        Ganharei certificado de participação?
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <p>Sim, todos os participantes receberão certificados de participação digital, desde que atendam aos requisitos mínimos de presença nas atividades</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingSix">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        Posso participar remotamente?
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <p>Sim! Teremos atividades online, minicursos e palestras. Basta se inscrever!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Acordeon