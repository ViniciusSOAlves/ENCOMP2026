import classes from "./GerenciaCurso.module.css"

import React, { useState, useEffect } from 'react'
const GerenciaCurso = () => {

    const [curso, setCurso] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/lista")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);//isso deve ser apagado na versao final
                setCurso(data);
            });
    }, []);

    const excluirLinha = async (id) => {

        const resposta = await fetch("http://localhost:5000/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        const res = await resposta.json();
        console.log(res);

    };

    const atualizaCurso = async () => {
        const resposta = await fetch("http://localhost:5000/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, nome, foto, descri, locate, dataAc })
        });

        const res = await resposta.json();
        console.log(res);
    }
    return (
        <>
            <div>
                <h2>Usuários</h2>

                {curso.map((user) => (
                    <div className={classes.item} key={user.id}>
                        <p>{user.id}</p>
                        <input type="text" defaultValue={user.nome} />
                        <input type="text" defaultValue={user.foto} />
                        <textarea type="text" defaultValue={user.descricao} />
                        <input type="text" defaultValue={user.locate} />
                        <input
                            type="date"
                            defaultValue={user.dataAc ? new Date(user.dataAc).toISOString().substring(0, 10) : ""}
                        />
                        <button onClick={() => excluirLinha(user.id)}>Excluir</button>
                        <button>Alterar</button>
                    </div>


                ))}
            </div>

        </>
    );
}

export default GerenciaCurso