import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Cursos.module.css';

const Cursos = () => {

    //BACKEND DE CADASTRO
    const navigate = useNavigate();

    const [foto, setFoto] = useState(null);
    const [mensagem, setMensagem] = useState("");

    const [formCurso, setFormCurso] = useState({
        nome: '',
        ministrantes: '',
        cargaHoraria: '',
        vagas: '',
        tipo: '',
        nivel: '',
        quantDias: '',
        local: '',
        linkInscricao: '',
        datas: []
    });

    const handleChange = (e) => {
        setFormCurso({ ...formCurso, [e.target.name]: e.target.value });
    };

    const handleQuantDiasChange = (e) => {
        const quantidade = Number(e.target.value);

        setFormCurso((prev) => {
            const novasDatas = Array.from({ length: quantidade }, (_, i) => prev.datas[i] || '');
            return {
                ...prev,
                quantDias: e.target.value,
                datas: novasDatas
            };
        });
    };

    const handleDataChange = (index, value) => {
        setFormCurso((prev) => {
            const novasDatas = [...prev.datas];
            novasDatas[index] = value;
            return {
                ...prev,
                datas: novasDatas
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosParaEnvio = {
            nome: formCurso.nome,
            ministrantes: formCurso.ministrantes,
            cargaHoraria: formCurso.cargaHoraria,
            vagas: formCurso.vagas,
            tipo: formCurso.tipo,
            nivel: formCurso.nivel,
            quantDias: formCurso.quantDias,
            local: formCurso.local,
            linkInscricao: formCurso.linkInscricao,
            datas: JSON.stringify(formCurso.datas)
        };

        try {
            const dadosFinais = new FormData();

            if (foto) {
                dadosFinais.append('foto', foto);
            }

            Object.keys(dadosParaEnvio).forEach((key) => {
                dadosFinais.append(key, dadosParaEnvio[key]);
            });

            const response = await fetch('http://localhost:5000/cadastroCurso', {
                method: 'POST',
                credentials: "include",
                body: dadosFinais
            });

            const data = await response.json();

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                setFormCurso({
                    nome: '',
                    ministrantes: '',
                    cargaHoraria: '',
                    vagas: '',
                    tipo: '',
                    nivel: '',
                    quantDias: '',
                    local: '',
                    linkInscricao: '',
                    datas: []
                });

                setFoto(null);
                setMensagem("");

                buscaCurso();

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

    //BACKEND DE BUSCA CURSO
    const [curso, setCurso] = useState([]);
    const [filtro, setFiltro] = useState({ nivel: "Entusiasta" });
    const buscaCurso = async () => {
        const busca = await fetch('http://localhost:5000/BuscaCurso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(filtro)
        })
        const data = await busca.json();
        setCurso(data);
    }
    const lidarComFiltro = (evento) => {
        setFiltro({ nivel: evento.target.value });
    };

    const excluirCurso = async (id) => {
        const response = await fetch('http://localhost:5000/deleteCurso', {
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
            buscaCurso();
        } else {
            alert("Erro: " + (data.error || "Falha ao excluir."));
        }
    };

    useEffect(() => {
        buscaCurso();
    }, [filtro]);

    const estiloBotao = (nivelBotao) => {
        const isSelecionado = filtro.nivel === nivelBotao;
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
        <div className="container py-4 ">
            <form onSubmit={handleSubmit} className={classes?.formularioPai || ''}>
                <h2 className={sectionTitle}>Informações do Curso</h2>

                <div className="row g-3">

                    {/* Nome */}
                    <div className="col-12 col-md-6">
                        <label className="form-label text-dark">Nome do Curso</label>
                        <input
                            name="nome"
                            type="text"
                            className="form-control"
                            value={formCurso.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Ministrantes */}
                    <div className="col-12 col-md-6">
                        <label className="form-label text-dark">Ministrantes</label>
                        <input
                            name="ministrantes"
                            type="text"
                            className="form-control"
                            value={formCurso.ministrantes}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Upload de Foto */}
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

                    {/* Carga Horária */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Carga Horária (horas)</label>
                        <input
                            name="cargaHoraria"
                            type="number"
                            className="form-control"
                            value={formCurso.cargaHoraria}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Número de Vagas */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Número de Vagas *(0 para Ilimitado)</label>
                        <input
                            name="vagas"
                            type="number"
                            className="form-control"
                            value={formCurso.vagas}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Tipo */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Tipo</label>
                        <select
                            name="tipo"
                            className="form-select"
                            value={formCurso.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="Online">Online</option>
                            <option value="Presencial">Presencial</option>
                        </select>
                    </div>

                    {/* Nível */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Nível</label>
                        <select
                            name="nivel"
                            className="form-select"
                            value={formCurso.nivel}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="Entusiasta">Entusiasta</option>
                            <option value="Basico">Básico</option>
                            <option value="Intermediario">Intermediário</option>
                            <option value="Avancado">Avançado</option>
                        </select>
                    </div>

                    {/* Local */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Local</label>
                        <input
                            name="local"
                            type="text"
                            className="form-control"
                            value={formCurso.local}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Quantidade de Dias */}
                    <div className="col-12 col-md-4">
                        <label className="form-label text-dark">Quantidade de dias</label>
                        <select
                            name="quantDias"
                            className="form-select"
                            value={formCurso.quantDias}
                            onChange={handleQuantDiasChange}
                            required
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    {/* LINK de INSCRICAO*/}
                    <div className="col-12 col-md-6">
                        <label className="form-label text-dark">Link de Inscrição</label>
                        <input
                            name="linkInscricao"
                            type="text"
                            className="form-control"
                            value={formCurso.linkInscricao}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Inputs Dinâmicos de Data */}
                    {formCurso.datas.map((data, index) => (
                        <div key={index} className="col-12 col-md-4">
                            <label className="form-label text-dark">
                                Data do Dia {index + 1}
                            </label>

                            <input
                                type="date"
                                name={`data_${index}`}
                                min="2026-10-26"
                                max="2026-10-30"
                                className="form-control"
                                value={data}
                                onChange={(e) => handleDataChange(index, e.target.value)}
                                required
                            />
                        </div>


                    ))}

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
                        Minicursos
                        <span className="cor">{'}'}</span>
                    </h1>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                    <div>
                        <input type="radio" className="btn-check" id="nivel1" value="Entusiasta" onChange={lidarComFiltro} checked={filtro.nivel === "Entusiasta"} name="nivel" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("Entusiasta")} htmlFor="nivel1">Entusiasta</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="nivel2" value="Basico" onChange={lidarComFiltro} checked={filtro.nivel === "Basico"} name="nivel" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("Basico")} htmlFor="nivel2">Básico</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="nivel3" value="Intermediario" onChange={lidarComFiltro} checked={filtro.nivel === "Intermediario"} name="nivel" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("Intermediario")} htmlFor="nivel3">Intermediário</label>
                    </div>
                    <div>
                        <input type="radio" className="btn-check" id="nivel4" value="Avancado" onChange={lidarComFiltro} checked={filtro.nivel === "Avancado"} name="nivel" />
                        <label className="btn rounded-pill px-4" style={estiloBotao("Avancado")} htmlFor="nivel4">Avançado</label>
                    </div>
                </div>

                {
                    Array.isArray(curso) && curso.length > 0 ? (

                        curso.map((i) => (

                            <div className='col-12 col-md-4 col-lg-3 mb-4' key={i.id}>
                                <div className="card h-100 shadow-sm" style={{ border: '3px solid var(--cor8)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#1e1e1e' }}>

                                    <div className="card-body p-3 text-light">

                                        <img
                                            src={"/FotosEquipe/" + i.foto}
                                            alt={i.nome}
                                            className='img-fluid rounded mb-3'
                                            style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
                                        />

                                        <h4 className='card-title fw-bold text-center'>{i.nome}</h4>

                                        <ul className='list-group list-group-flush mt-3 px-0'>
                                            <li className='list-group-item bg-transparent text-light border-secondary px-0 py-2'>
                                                <strong>Ministrantes:</strong> {i.ministrantes}
                                            </li>
                                            <li className='list-group-item bg-transparent text-light border-secondary px-0 py-2'>
                                                <strong>Carga horária:</strong> {i.cargahoraria}
                                            </li>
                                            <li className='list-group-item bg-transparent text-light border-secondary px-0 py-2'>
                                                <strong>Vagas:</strong> {i.vagas == 0 ? 'Ilimitado' : i.vagas}
                                            </li>
                                            <li className='list-group-item bg-transparent text-light border-secondary px-0 py-2'>
                                                <strong>Tipo:</strong> {i.tipo}
                                            </li>
                                            {i.datas_crono && i.datas_crono.length > 0 && (
                                                <li className="list-group-item bg-transparent text-light border-secondary px-0 py-2">
                                                    <strong>Datas:</strong>

                                                    <ul className="list-unstyled mb-0 mt-1 ps-2">
                                                        {i.datas_crono.map((crono) => (
                                                            <li key={crono.id}>
                                                                • {new Date(crono.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                                                <span className="ms-2 text-secondary">
                                                                    ({new Date(crono.HoraIni).toLocaleTimeString('pt-BR', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        timeZone: 'UTC'
                                                                    })} - {new Date(crono.HoraFim).toLocaleTimeString('pt-BR', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        timeZone: 'UTC'
                                                                    })})
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            )}
                                        </ul>

                                        <button onClick={() => excluirCurso(i.id)}>
                                            Excluir
                                        </button>
                                    </div>

                                </div>
                            </div>

                        ))
                    ) : (
                        <p className='text-light'>Nenhuma curso encontrada.</p>
                    )
                }

            </div>
        </div>
    );
};

export default Cursos;