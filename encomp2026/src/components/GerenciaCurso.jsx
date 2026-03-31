import React, { useState, useEffect } from 'react'
const GerenciaCurso = () => {

    const [curso, setCurso] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/lista")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCurso(data);
            });
    }, []);

    return (
        <>
            <div>
                <h2>Usuários</h2>

                {curso.map((user) => (
                    <div key={user.id}>
                        <p>{user.id}</p>
                        <p>{user.nome}</p>
                        <p>{user.foto}</p>
                        <p>{user.descricao}</p>
                        <p>{user.locate}</p>
                        <p>{new Date(user.dataAc).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

        </>
    );
}

export default GerenciaCurso