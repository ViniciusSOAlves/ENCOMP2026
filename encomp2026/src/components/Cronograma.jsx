import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cronograma = () => {
    const [crono, setCrono] = useState([]);
    const [filtro, setFiltro] = useState({ data: "2026-10-26" });

    const buscaCronograma = async () => {
        try {
            const busca = await fetch('http://localhost:5000/Cronograma', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filtro)
            });
            const data = await busca.json();
            setCrono(data);
        } catch (error) {
            console.error("Erro ao buscar cronograma:", error);
        }
    }

    const lidarComFiltro = (evento) => setFiltro({ data: evento.target.value });

    useEffect(() => {
        buscaCronograma();
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
        <div className="container py-5 text-light bg-black" style={{ '--cor6': '#8162eb', '--cor8': '#4c0c87' }}>
            
            {/* TÍTULO */}
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1 className="fw-bold text-light m-0">
                        <span className="cor" id="Programacao">{'{'}</span> Programação <span className="cor">{'}'}</span>
                    </h1>
                </div>
            </div>

            {/* FILTROS */}
            <div className="row">
                <div className="col-12 mb-5">
                    <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3">
                        {["2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30"].map((data, index) => {
                            const dias = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
                            return (
                                <div key={data}>
                                    <input type="radio" className="btn-check" id={`diaC${index}`} value={data} onChange={lidarComFiltro} checked={filtro.data === data} name="diaC" />
                                    <label className="btn rounded-pill px-3 px-md-4" style={estiloBotao(data)} htmlFor={`diaC${index}`}>{dias[index]}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CONTEÚDO */}
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="rounded p-3 p-md-4 bg-dark shadow-sm" style={{ border: '1px solid var(--cor6)' }}>
                        <h4 className="mb-4 text-center text-md-start" style={{ color: 'var(--cor6)' }}>
                            Cronograma – {filtro.data.split('-').reverse().join('/')}
                        </h4>

                        <div className="table-responsive">
                            <table className="table table-dark table-hover align-middle mb-0" style={{ '--bs-table-bg': 'transparent' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--cor6)' }}>
                                        <th scope="col" className="pb-3 text-nowrap" style={{ color: 'var(--cor6)' }}>Horário</th>
                                        <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Atividade</th>
                                        <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Formato</th>
                                        <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Local / Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(crono) && crono.length > 0 ? (
                                        crono.map((i) => (
                                            <tr key={i.id} className="border-bottom border-secondary">
                                                <td className="fw-bold fs-6 fs-md-5 text-nowrap">
                                                    {i.horario && !i.horario.includes('T00:00:00.000Z')
                                                        ? new Date(i.horario).toLocaleTimeString('pt-BR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })
                                                        : "--:--"}
                                                </td>
                                                <td>
                                                    <span className="d-block text-secondary small">Atividade</span>
                                                    <span className="fs-6">{i.atividade}</span>
                                                </td>
                                                <td>
                                                    <span className="badge rounded-pill border border-warning text-warning bg-transparent px-3 py-2">
                                                        {i.formato || '---'}
                                                    </span>
                                                </td>
                                                <td>{i.LocalLink}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted py-5">Nenhum Cronograma encontrado para esta data.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cronograma;