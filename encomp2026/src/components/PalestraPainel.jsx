import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Cursos.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

const Palestras = () => {
    const navigate = useNavigate();

    const [foto, setFoto] = useState(null);
    const [mensagem, setMensagem] = useState("");

    const [formPalestra, setFormPalestra] = useState({
        nome: '',
        palestrante: '',
        status: '',
        tema: '',
        descri: '',
        data: '',
        local: '',
        modalidade: ''
    });

    const inicioSemana = "2026-10-26";
    const fimSemana = "2026-10-30";

    const handleChange = (e) => {
        setFormPalestra({ ...formPalestra, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosParaEnvio = {
            nome: formPalestra.nome,
            palestrante: formPalestra.palestrante,
            status: formPalestra.status,
            tema: formPalestra.tema,
            descri: formPalestra.descri,
            data: formPalestra.data,
            local: formPalestra.local,
            modalidade: formPalestra.modalidade
        };

        try {
            const dadosFinais = new FormData();

            if (foto) {
                dadosFinais.append('foto', foto);
            }

            Object.keys(dadosParaEnvio).forEach((key) => {
                dadosFinais.append(key, dadosParaEnvio[key]);
            });

            const response = await fetch('http://localhost:5000/cadastraPalestra', {
                method: 'POST',
                credentials: "include",
                body: dadosFinais
            });

            const data = await response.json();

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");

                setFormPalestra({
                    nome: '',
                    palestrante: '',
                    status: '',
                    tema: '',
                    descri: '',
                    data: '',
                    local: '',
                    modalidade: ''
                });

                setFoto(null);
                setMensagem("");

                buscaPalestra();

                const fileInput = document.getElementById("input-foto");

                if (fileInput) {
                    fileInput.value = "";
                }
            } else {
                alert("Erro: " + (data.error || "Falha ao cadastrar."));
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };


    //BACKEND DE BUSCA PALESTRA
    const [palestra, setPalestra] = useState([]);
    const [filtro, setFiltro] = useState({ data: "2026-10-26" });

    const buscaPalestra = async () => {
        const busca = await fetch('http://localhost:5000/BuscaPalestra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(filtro)
        })
        const data = await busca.json();
        setPalestra(data);
    }
    const lidarComFiltro = (evento) => {
        setFiltro({ data: evento.target.value });
    };
    const excluirPalestra = async (id) => {
        const response = await fetch('http://localhost:5000/deletePalestra', {
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
            buscaPalestra();
        } else {
            alert("Erro: " + (data.error || "Falha ao excluir."));
        }
    };

    useEffect(() => {
        buscaPalestra();
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

    //VARIAVEL DE ESTILIZACAO
    const sectionTitle = "fs-4 fw-bold text-dark mb-4 mt-5 border-bottom pb-2";

    return (
        <div className="container py-4">
            <form onSubmit={handleSubmit} className={classes?.formularioPai || ''}>
                <h2 className={sectionTitle}>Informações da Palestra</h2>

                <div className="row g-3">

                    {/* Nome */}
                    <div className="col-12 col-md-6">
                        <label className="form-label text-dark">Nome da Palestra</label>
                        <input
                            name="nome"
                            type="text"
                            className="form-control"
                            value={formPalestra.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Palestrante */}
                    <div className="col-12 col-md-6">
                        <label className="form-label text-dark">Palestrante</label>
                        <input
                            name="palestrante"
                            type="text"
                            className="form-control"
                            value={formPalestra.palestrante}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Foto */}
                    <div className="col-12">
                        <h2 className={`${sectionTitle} mt-lg-0`}>Foto</h2>

                        <div className="bg-white p-1 rounded">
                            <div
                                className="border border-2 border-dashed border-success bg-light rounded d-flex flex-column align-items-center justify-content-center text-center gap-3 p-4"
                                style={{ minHeight: "220px" }}
                            >
                                <svg
                                    className="text-success"
                                    style={{ width: "3rem", height: "3rem" }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>

                                <div>
                                    <p className="fw-bold text-dark fs-5 mb-1">
                                        {mensagem || "Arraste o arquivo ou navegue..."}
                                    </p>

                                    <p className="small text-muted mb-0">
                                        Formatos: .jpeg, .png.
                                    </p>
                                </div>

                                <div className="d-flex gap-2">
                                    <label
                                        htmlFor="input-foto"
                                        className="btn btn-success fw-bold px-4 py-2 shadow-sm cursor-pointer"
                                    >
                                        Navegue...
                                    </label>

                                    <button
                                        type="button"
                                        className="btn btn-secondary fw-bold px-4 py-2 shadow-sm"
                                        onClick={() => {
                                            setMensagem("");
                                            setFoto(null);

                                            const fileInput = document.getElementById("input-foto");

                                            if (fileInput) {
                                                fileInput.value = "";
                                            }
                                        }}
                                    >
                                        Limpar
                                    </button>
                                </div>

                                <input
                                    type="file"
                                    id="input-foto"
                                    name="foto"
                                    accept="image/jpeg, image/png"
                                    className="d-none"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];

                                            if (
                                                (file.type === 'image/jpeg' || file.type === 'image/png')
                                            ) {
                                                setFoto(file);
                                                setMensagem(file.name);
                                            } else {
                                                alert("Erro! Formato inválido.");
                                                setMensagem("");
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Status</label>
                        <input
                            name="status"
                            type="text"
                            className="form-control"
                            value={formPalestra.status}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Tema */}
                    <div className="col-12 col-md-8">
                        <label className="form-label text-dark">Tema</label>
                        <input
                            name="tema"
                            type="text"
                            className="form-control"
                            value={formPalestra.tema}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Data */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Data</label>
                        <input
                            name="data"
                            type="date"
                            min={inicioSemana}
                            max={fimSemana}
                            className="form-control"
                            value={formPalestra.data}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Local */}
                    <div className="col-12 col-md-8">
                        <label className="form-label text-dark">Local</label>
                        <input
                            name="local"
                            type="text"
                            className="form-control"
                            value={formPalestra.local}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Modalidade */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Modalidade</label>
                        <select
                            name="modalidade"
                            className="form-select"
                            value={formPalestra.modalidade}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    {/* Descrição */}
                    <div className="col-12">
                        <label className="form-label text-dark">Descrição</label>
                        <textarea
                            name="descri"
                            rows="3"
                            className="form-control"
                            value={formPalestra.descri}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12 mt-4 d-flex gap-3">

                        {/* Botão de Enviar */}
                        <button
                            type="submit"
                            className="btn btn-primary px-5 py-2"
                        >
                            Salvar Dados
                        </button>

                        {/* Botão de Voltar */}
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

            <div className="row mt-5 mb-5 g-4 justify-content-center">
                <div className="col-12 text-center">
                    <h1 className="fw-bold text-light mb-5">
                        <span className="cor">{'{'}</span>
                        Palestras
                        <span className="cor">{'}'}</span>
                    </h1>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                    <div>
                        <input type="radio" className="btn-check" id="dia1" value="2026-10-26" onChange={lidarComFiltro} checked={filtro.data === "2026-10-26"} name="dia" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-26")} htmlFor="dia1">Segunda-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="dia2" value="2026-10-27" onChange={lidarComFiltro} checked={filtro.data === "2026-10-27"} name="dia" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-27")} htmlFor="dia2">Terça-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="dia3" value="2026-10-28" onChange={lidarComFiltro} checked={filtro.data === "2026-10-28"} name="dia" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-28")} htmlFor="dia3">Quarta-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="dia4" value="2026-10-29" onChange={lidarComFiltro} checked={filtro.data === "2026-10-29"} name="dia" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-29")} htmlFor="dia4">Quinta-feira</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="dia5" value="2026-10-30" onChange={lidarComFiltro} checked={filtro.data === "2026-10-30"} name="dia" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("2026-10-30")} htmlFor="dia5">Sexta-feira</label>
                    </div>
                </div>

                {
                    Array.isArray(palestra) && palestra.length > 0 ? (

                        palestra.map((i) => (

                            <div className='col-12 col-md-6 col-lg-4' key={i.id} >
                                <div className="card bg-dark text-light h-100  p-3" style={{ border: '3px solid var(--cor8)' }}>

                                    <div className="card-body" id={i.id} >
                                        <img src={"/FotosPalestras/" + i.foto} alt={i.foto} className='img-fluid w-100' style={{ height: '500px', objectFit: 'cover' }} />
                                        <h4 className='card-title mt-3'>{i.nome}</h4>
                                        <h6 className='card-text'>{i.palestrante}, {i.status}</h6>
                                        <p className='card-text'>{i.descri}</p>
                                    </div>
                                    <ul className='list-group list-group-flush bg-transparent'>
                                        <li className='list-group-item bg-transparent text-light'>Área: {i.tema}</li>
                                        <li className='list-group-item bg-transparent text-light'>Data: {i.data ? new Date(i.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : "Não informada"}</li>
                                        <li className='list-group-item bg-transparent text-light'>Hora: {i.horario ? new Date(i.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "Não informada"}</li>
                                        <li className='list-group-item bg-transparent text-light'>Local: {i.local}</li>
                                        <li className='list-group-item bg-transparent text-light'>Modalidade: {i.modalidade}</li>
                                    </ul>
                                    <button onClick={() => excluirPalestra(i.id)}>
                                        Excluir
                                    </button>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-light'>Nenhuma palestra encontrada.</p>
                    )
                }
            </div>
        </div>
    );
};

export default Palestras;