import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Cursos.module.css';

const EventosExtrasPainel = () => {
    const navigate = useNavigate();

    const [formEvento, setFormEvento] = useState({
        data: '',
        horario: '',
        atividade: '',
        formato: '',
        local_link: ''
    });

    const handleChange = (e) => {
        setFormEvento({
            ...formEvento,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dadosParaEnvio = {
                data: formEvento.data,
                horario: formEvento.horario,
                atividade: formEvento.atividade,
                formato: formEvento.formato || null,
                local_link: formEvento.local_link || null
            };

            const response = await fetch('http://localhost:5000/cadastraEventos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(dadosParaEnvio)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Evento cadastrado com sucesso!");

                setFormEvento({
                    data: '',
                    horario: '',
                    atividade: '',
                    formato: '',
                    local_link: ''
                });

                buscaCronograma();

            } else {
                alert("Erro: " + (data.error || "Falha ao cadastrar."));
            }

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };


    //BACKEND DE CRONOGRAMA
    const [crono, setCrono] = useState([]);
    const [filtro, setFiltro] = useState({ data: "2026-10-26" });

    const buscaCronograma = async () => {
        try {
            const busca = await fetch('http://localhost:5000/eventosExtras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
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

    //Excluir exento
    const excluirEvento = async (id) => {
        const response = await fetch('http://localhost:5000/deleteEventos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ id })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Exclusão realizada com sucesso!");
            buscaCronograma();
        } else {
            alert("Erro: " + (data.error || "Falha ao excluir."));
        }
    };

    return (
        <div className="container py-4">

            <form
                onSubmit={handleSubmit}
                className={classes?.formularioPai || ''}
            >

                <h2 className="fs-4 fw-bold text-dark mb-4 mt-5 border-bottom pb-2">
                    Cadastro de Evento Extra
                </h2>

                <div className="row g-3">

                    {/* Data */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">
                            Data
                        </label>

                        <input
                            name="data"
                            type="date"
                            className="form-control"
                            value={formEvento.data}
                            onChange={handleChange}
                            min="2026-10-26"
                            max="2026-10-30"
                            required
                        />
                    </div>


                    {/* Horário */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">
                            Horário
                        </label>

                        <input
                            name="horario"
                            type="time"
                            className="form-control"
                            value={formEvento.horario}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {/* Atividade */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">
                            Atividade
                        </label>

                        <input
                            name="atividade"
                            type="text"
                            className="form-control"
                            value={formEvento.atividade}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {/* Formato */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">
                            Formato
                        </label>

                        <select
                            name="formato"
                            className="form-select"
                            value={formEvento.formato}
                            onChange={handleChange}
                        >
                            <option value="">
                                Não informado
                            </option>

                            <option value="Presencial">
                                Presencial
                            </option>

                            <option value="Online">
                                Online
                            </option>
                        </select>
                    </div>


                    {/* Local / Link */}
                    <div className="col-12 col-md-8">
                        <label className="form-label text-dark">
                            Local / Link
                        </label>

                        <input
                            name="local_link"
                            type="text"
                            className="form-control"
                            value={formEvento.local_link}
                            onChange={handleChange}
                        />
                    </div>


                    {/* Botões */}
                    <div className="col-12 mt-4 d-flex gap-3">

                        <button
                            type="submit"
                            className="btn btn-primary px-5 py-2"
                        >
                            Salvar Dados
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-secondary px-5 py-2"
                        >
                            Página Inicial
                        </button>

                    </div>

                </div>

            </form>
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
                        <input type="radio" className="btn-check" id="diaC1" value="2026-10-26" onChange={lidarComFiltro} checked={filtro.data === "2026-10-26"} name="diaC" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-26")} htmlFor="diaC1">Segunda-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="diaC2" value="2026-10-27" onChange={lidarComFiltro} checked={filtro.data === "2026-10-27"} name="diaC" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-27")} htmlFor="diaC2">Terça-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="diaC3" value="2026-10-28" onChange={lidarComFiltro} checked={filtro.data === "2026-10-28"} name="diaC" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-28")} htmlFor="diaC3">Quarta-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="diaC4" value="2026-10-29" onChange={lidarComFiltro} checked={filtro.data === "2026-10-29"} name="diaC" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-29")} htmlFor="diaC4">Quinta-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="diaC5" value="2026-10-30" onChange={lidarComFiltro} checked={filtro.data === "2026-10-30"} name="diaC" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-30")} htmlFor="diaC5">Sexta-feira</label>
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
                                    <th scope="col" className="pb-3" style={{ color: 'var(--cor6)' }}>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(crono) && crono.length > 0 ? (
                                    crono.map((i) => (
                                        <tr key={i.id} className="border-bottom border-secondary">
                                            <td className="fw-bold fs-5">
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
                                                    {i.formato || '- /-'}
                                                </span>
                                            </td>
                                            <td>{i.LocalLink}</td>
                                            <td>
                                                <button onClick={() => excluirEvento(i.id)}>
                                                    Excluir
                                                </button>
                                            </td>
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

        </div>
    );
};

export default EventosExtrasPainel;