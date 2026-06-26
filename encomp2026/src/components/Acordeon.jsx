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
                    <div className="col-12 col-md-10 col-lg-8"> {/* Limita a largura nas telas maiores */}

                        <div className="accordion bg-dark" id="acordeonEncomp">
                            <style>{`
          #acordeonEncomp .accordion-button::after {
            filter: invert(1) brightness(2);
          }
        `}</style>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Accordion Item #1
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Accordion Item #2
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item bg-dark text-light" style={{ borderColor: 'var(--cor5)' }}>
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#acordeonEncomp">
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes.
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