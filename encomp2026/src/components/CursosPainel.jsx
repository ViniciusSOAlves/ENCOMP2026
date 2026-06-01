import classes from "./Cursos.module.css"

import React, { useState } from 'react'
import GerenciaCurso from "./GerenciaCurso";

const Cursos = () => {

    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [fotoUp, setUP] = useState(null);
    const [dataAc, setData] = useState("");
    const [descri, setDescri] = useState("");
    const [locate, setLocate] = useState("");

   const enviar = async (e) => {
    e.preventDefault();

    if (!fotoUp) {
      alert("Selecione uma imagem!");
      return;
    }

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("foto", foto);
    formData.append("fotoUp", fotoUp);
    formData.append("descri", descri);
    formData.append("locate", locate);
    formData.append("dataAc", dataAc);

    const resposta = await fetch("http://localhost:5000/usuario", {
      method: "POST",
      body: formData,
    });

    const res = await resposta.json();
    console.log(res);
  };


  return (
    <>
        <form onSubmit={enviar} className={classes.formularioPai}>
            <div className={classes.form}>
                <label htmlFor="nameFOrm" name="nome" id="nome">Nome: </label>
                <input 
                type="text"
                name="nameFOrm"
                id="nameFOrm"
                required
                onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className={`${classes.form} ${classes.foto}`}>
                <label htmlFor="fotoFOrm" name="foto" id="foto">Nome da foto: </label>
                <input 
                type="text"
                name="fotoFOrm"
                id="fotoFOrm"
                required
                onChange={(e) => setFoto(e.target.value)}
                />
                <br></br>
                <label htmlFor="upFOrm" name="fotoUP" id="fotoUP">Upload de Imagem: </label>
                <input 
                type="file"
                name="upFOrm"
                id="upFOrm"
                required
                accept="image/*"
                onChange={(e) => setUP(e.target.files[0])}
                />
            </div>

            <div className={classes.form}>
                <label htmlFor="descriFOrm" name="descri" id="descri">Descrição: </label>
                <textarea
                type="text"
                name="descriFOrm"
                id="descriFOrm"
                placeholder="Digite a descrição do curso... "
                onChange={(e) => setDescri(e.target.value)}
                />
            </div>

            <div className={classes.form}>
                <label htmlFor="dataFOrm" name="data" id="data">Data: </label>
                <input
                type="date"
                name="dataFOrm"
                id="dataFOrm"
                required
                onChange={(e) => setData(e.target.value)}
                />
            </div>
            
            <div className={classes.form}>
                <label htmlFor="locateFOrm" name="locate" id="locate">Localização: </label>
                <input 
                type="text"
                name="locateFOrm"
                id="locateFOrm"
                required
                onChange={(e) => setLocate(e.target.value)}
                />
            </div>
            <div className="botao">
                <button type="submit">Enviar</button>
            </div>
        </form>

         <GerenciaCurso />
    </>
  );
}

export default Cursos