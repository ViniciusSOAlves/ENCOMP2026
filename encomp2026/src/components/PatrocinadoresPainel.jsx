import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Cursos.module.css';

const PatrocinadoresPainel = () => {
    const navigate = useNavigate();

    const [foto, setFoto] = useState(null);
    const [mensagem, setMensagem] = useState("");

    const [formPatrocinador, setFormPatrocinador] = useState({
        nome: ''
    });

    const handleChange = (e) => {
        setFormPatrocinador({
            ...formPatrocinador,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dadosFinais = new FormData();

            if (foto) {
                dadosFinais.append('foto', foto);
            }

            dadosFinais.append('nome', formPatrocinador.nome);

            const response = await fetch('http://localhost:5000/cadastroPatrocinador', {
                method: 'POST',
                credentials: "include",
                body: dadosFinais
            });

            const data = await response.json();

            if (response.ok) {
                alert("Patrocinador cadastrado com sucesso!");

                setFormPatrocinador({
                    nome: ''
                });

                setFoto(null);
                setMensagem("");

                buscaPatriocinador();

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

    //BACKEND DO PATROCINADOR
    const [patrio, setPatrio] = useState([])

    const buscaPatriocinador = async () => {
        const busca = await fetch('http://localhost:5000/patrocinador', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await busca.json();
        setPatrio(data);
    }

    const excluirPatrocinador = async (id) => {
        const response = await fetch('http://localhost:5000/deletePatrocinador', {
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
            buscaPatriocinador();
        } else {
            alert("Erro: " + (data.error || "Falha ao excluir."));
        }
    };

    useEffect(() => {
        buscaPatriocinador();
    }, []);

    return (
        <div className="container py-4">

            <form onSubmit={handleSubmit} className={classes?.formularioPai || ''}>

                <h2 className="fs-4 fw-bold text-dark mb-4 mt-5 border-bottom pb-2">
                    Cadastro de Patrocinador
                </h2>

                <div className="row g-3">

                    {/* Nome */}
                    <div className="col-12">
                        <label className="form-label text-dark">
                            Nome do Patrocinador
                        </label>

                        <input
                            name="nome"
                            type="text"
                            className="form-control"
                            value={formPatrocinador.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Foto */}
                    <div className="col-12">

                        <h2 className="fs-4 fw-bold text-dark mb-4 mt-5 border-bottom pb-2">
                            Foto
                        </h2>

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
                                        className="btn btn-success fw-bold px-4 py-2 shadow-sm"
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

                                                alert("Erro! Formato inválido ");
                                                setMensagem("");

                                            }
                                        }
                                    }}
                                />

                            </div>

                        </div>

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

            <div className="row g-4 justify-content-center mt-4">
                <div className="col-12 text-center">
                    <h1 className="fw-bold text-light mb-5">
                        <span className="cor">{'{'}</span>
                        Patrocinadores
                        <span className="cor">{'}'}</span>
                    </h1>
                </div>

                {
                    Array.isArray(patrio) && patrio.length > 0 ? (

                        patrio.map((i) => (

                            <div className='col-auto' key={i.id} >
                                <div className="card bg-dark text-light p-1" style={{ border: '3px solid var(--cor8)' }}>

                                    <div className="card-body p-1 text-center" id={i.id} >
                                        <img src={"/patrocinadores/" + i.foto} alt={i.foto} className='img-fluid' style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                        <h6 className='card-title mt-1 mb-0' style={{ fontSize: '0.75rem' }}>{i.nome}</h6>
                                    </div>
                                    <button onClick={() => excluirPatrocinador(i.id)}>
                                        Excluir
                                    </button>
                                </div>

                            </div>

                        ))
                    ) : (
                        <p className='text-light'>Nenhum Patriocinador Encontrado.</p>
                    )
                }
            </div>

        </div>
    );
};

export default PatrocinadoresPainel;