import React, { useState, useEffect } from 'react';

const Palestras = () => {
  const [palestra, setPalestra] = useState([]);
  const [filtro, setFiltro] = useState({ data: "2026-10-26" });

  const buscaPalestra = async () => {
    const busca = await fetch('http://localhost:5000/BuscaPalestra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filtro)
    });

    const data = await busca.json();
    setPalestra(data);
  };

  const lidarComFiltro = (evento) => {
    setFiltro({ data: evento.target.value });
  };

  useEffect(() => {
    buscaPalestra();
  }, [filtro]);

  const estiloBotao = (dataBotao) => {
    const isSelecionado = filtro.data === dataBotao;

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
    <div className="container py-5">

      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="fw-bold text-light m-0">
            <span className="cor" id="palestras">
              {'{'}
            </span>
            {' '}Palestras{' '}
            <span className="cor">
              {'}'}
            </span>
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">

            {[
              "2026-10-26",
              "2026-10-27",
              "2026-10-28",
              "2026-10-29",
              "2026-10-30"
            ].map((data, index) => {

              const dias = [
                "Segunda-feira",
                "Terça-feira",
                "Quarta-feira",
                "Quinta-feira",
                "Sexta-feira"
              ];

              return (
                <div key={data}>
                  <input
                    type="radio"
                    className="btn-check"
                    id={`diaPalestra${index}`}
                    value={data}
                    onChange={lidarComFiltro}
                    checked={filtro.data === data}
                    name="diaPalestra"
                  />

                  <label
                    className="btn rounded-pill px-3 px-md-4"
                    style={estiloBotao(data)}
                    htmlFor={`diaPalestra${index}`}
                  >
                    {dias[index]}
                  </label>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      <div className="row g-4 justify-content-center">

        {Array.isArray(palestra) && palestra.length > 0 ? (

          palestra.map((i) => (

            <div
              className="col-12 col-sm-6 col-lg-3"
              key={i.id}
            >

              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
              >

                <div className="position-relative">

                  <img
                    src={"/FotosPalestras/" + i.foto}
                    alt={i.palestrante}
                    style={{
                      width: "100%",
                      height: "230px",
                      display: "block",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderBottom: "3px solid var(--cor8)"
                    }}
                  />

                  {i.modalidade && (
                    <span
                      className="badge position-absolute top-0 start-0 m-2 px-2 py-1"
                      style={{
                        backgroundColor:
                          i.modalidade?.toLowerCase() === "online"
                            ? "#0dcaf0"
                            : "#ffc107",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.5)"
                      }}
                    >
                      {i.modalidade?.toUpperCase()}
                    </span>
                  )}

                </div>

                <div
                  className="card-body p-2 text-light d-flex flex-column align-items-center text-center"
                  id={i.id}
                  style={{
                    minWidth: 0
                  }}
                >

                  <h6
                    className="fw-bold mb-1 w-100"
                    style={{
                      color: "var(--cor6)",
                      fontSize: "1rem",
                      overflowWrap: "anywhere"
                    }}
                  >
                    {i.palestrante}
                  </h6>

                  <p
                    className="small mb-2 w-100"
                    style={{
                      color: "#999999",
                      fontSize: "0.8rem",
                      overflowWrap: "anywhere"
                    }}
                  >
                    {i.status}
                  </p>

                  <span
                    className="badge rounded-pill mb-2 px-3 py-1 w-100"
                    style={{
                      backgroundColor: "var(--cor8)",
                      color: "#ffffff",
                      fontWeight: "500",
                      fontSize: "0.75rem",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere"
                    }}
                  >
                    {i.tema}
                  </span>

                  <p
                    className="fw-bold mb-1 text-light w-100"
                    style={{
                      fontSize: "0.9rem",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word"
                    }}
                  >
                    {i.nome}
                  </p>

                  <p
                    className="small mb-2 w-100"
                    style={{
                      color: "#cccccc",
                      fontSize: "0.8rem",
                      lineHeight: "1.3",
                      maxWidth: "100%",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      whiteSpace: "normal"
                    }}
                  >
                    {i.descri}
                  </p>

                  <hr className="w-100 border-secondary opacity-25 my-1" />

                  <div className="w-100">

                    <p
                      className="mb-1 fw-bold"
                      style={{
                        color: "var(--cor6)",
                        fontSize: "0.85rem"
                      }}
                    >
                      {i.data
                        ? new Date(i.data).toLocaleDateString("pt-BR", {
                            timeZone: "UTC"
                          })
                        : "Não informada"}
                    </p>

                    <p
                      className="mb-1 text-light"
                      style={{
                        fontSize: "0.8rem"
                      }}
                    >
                      Início:{" "}
                      {i.horario
                        ? new Date(i.horario).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "UTC"
                          })
                        : "Não informada"}
                    </p>

                    <p
                      className="mb-0 text-muted"
                      style={{
                        fontSize: "0.75rem",
                        overflowWrap: "anywhere"
                      }}
                    >
                      {i.modalidade} ({i.local})
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-12 text-center">
            <p className="text-light">
              Nenhuma palestra encontrada.
            </p>
          </div>

        )}

      </div>

    </div>
  );
};

export default Palestras;