import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cronograma = () => {
    const [crono, setCrono] = useState([]);
    const [filtro, setFiltro] = useState({ data: "2026-06-15" });

    const buscaCronograma = async () => {
        try {
            const busca = await fetch('http://localhost:5000/Cronograma', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filtro)
            });
            const data = await busca.json();
            setCrono(data);
        } catch (error) {
            console.error("Erro ao buscar cronograma:", error);
        }
    }

    const lidarComFiltro = (evento) => {
        setFiltro({ data: evento.target.value });
    };

    useEffect(() => {
        buscaCronograma();
    }, [filtro]);

    // Função que calcula o estilo do botão puxando as variáveis CSS
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
        // As variáveis CSS foram declaradas na div principal para funcionarem nos estilos inline
        <div
            className="container py-5 text-light bg-black"
            style={{ '--cor6': '#8162eb', '--cor8': '#4c0c87' }}
        >

            <div className="col-12 text-center">
                <h1 className="fw-bold text-light mb-5">
                    <span className="cor">{'{'}</span>
                    Programação
                    <span className="cor">{'}'}</span>
                </h1>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                <div>
                    <input type="radio" className="btn-check" id="dia1" value="2026-06-15" onChange={lidarComFiltro} checked={filtro.data === "2026-06-15"} name="dia" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("2026-06-15")} htmlFor="dia1">Segunda-feira</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="dia2" value="2026-06-16" onChange={lidarComFiltro} checked={filtro.data === "2026-06-16"} name="dia" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("2026-06-16")} htmlFor="dia2">Terça-feira</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="dia3" value="2026-06-17" onChange={lidarComFiltro} checked={filtro.data === "2026-06-17"} name="dia" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("2026-06-17")} htmlFor="dia3">Quarta-feira</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="dia4" value="2026-06-18" onChange={lidarComFiltro} checked={filtro.data === "2026-06-18"} name="dia" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("2026-06-18")} htmlFor="dia4">Quinta-feira</label>
                </div>
                <div>
                    <input type="radio" className="btn-check" id="dia5" value="2026-06-19" onChange={lidarComFiltro} checked={filtro.data === "2026-06-19"} name="dia" />
                    <label className="btn rounded-pill px-4" style={estiloBotao("2026-06-19")} htmlFor="dia5">Sexta-feira</label>
                </div>
            </div>

            {/* Container da tabela usando a variável CSS na borda */}
            <div className="rounded p-4 bg-dark" style={{ border: '1px solid var(--cor6)' }}>

                <h3 className="mb-4" style={{ color: 'var(--cor6)' }}>
                    Cronograma – {filtro.data.split('-').reverse().join('/')}
                </h3>

                <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle" style={{ '--bs-table-bg': 'transparent' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--cor6)' }}>
                                <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Horário</th>
                                <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Atividade</th>
                                <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Formato</th>
                                <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Local / Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(crono) && crono.length > 0 ? (
                                crono.map((i) => (
                                    <tr key={i.id} className="border-bottom border-secondary">
                                        <td className="fw-bold fs-5">
                                            {i.horario ? new Date(i.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                                        </td>
                                        <td>
                                            <span className="d-block text-secondary small">Atividade</span>
                                            <span className="fs-6">{i.atividade}</span>
                                        </td>
                                        <td>
                                            <span className="badge rounded-pill border border-warning text-warning bg-transparent px-3 py-2">
                                                {i.formato || 'Presencial'}
                                            </span>
                                        </td>
                                        <td>{i.LocalLink}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted py-5">
                                        Nenhum Cronograma encontrado para esta data.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cronograma;