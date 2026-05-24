import { useEffect } from "react";
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

const Cronograma = () => {
    const [crono, setCrono] = useState([]);
    const [filtro, setFiltro] = useState({ data: "2026-06-15" });

    const buscaCronograma = async () => {
        const busca = await fetch('http://localhost:5000/Cronograma', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filtro)
        })
        const data = await busca.json();
        setCrono(data);
    }
    const lidarComFiltro = (evento) => {
        setFiltro({ data: evento.target.value });
    };

    useEffect(() => {
        buscaCronograma();
    }, [filtro]);
    return (
        <div>

            <div className="row mt-5 mb-5 g-4 " >
                <h1>Cronograma da semana</h1>

                <label className="text-dark">
                    <input 
                        type="radio" 
                        value="2026-06-15" 
                        onChange={lidarComFiltro} 
                        name="dia" 
                        checked={filtro.data === "2026-06-15"} 
                    /> Segunda-feira
                </label>
                <label className="text-dark">
                    <input 
                        type="radio" 
                        value="2026-06-16" 
                        onChange={lidarComFiltro} 
                        name="dia" 
                        checked={filtro.data === "2026-06-16"} 
                    /> Terça-feira
                </label>
                <label className="text-dark">
                    <input 
                        type="radio" 
                        value="2026-06-17" 
                        onChange={lidarComFiltro} 
                        name="dia" 
                        checked={filtro.data === "2026-06-17"} 
                    /> Quarta-feira
                </label>
                <label className="text-dark">
                    <input 
                        type="radio" 
                        value="2026-06-18" 
                        onChange={lidarComFiltro} 
                        name="dia" 
                        checked={filtro.data === "2026-06-18"} 
                    /> Quinta-feira
                </label>
                <label className="text-dark">
                    <input 
                        type="radio" 
                        value="2026-06-19" 
                        onChange={lidarComFiltro} 
                        name="dia" 
                        checked={filtro.data === "2026-06-19"} 
                    /> Sexta-feira
                </label>
                {
                    Array.isArray(crono) && crono.length > 0 ? (

                        crono.map((i) => (

                            <div className='col-12 col-md-4 col-lg-3' key={i.id} >
                                <div className="border p-3 h-100">

                                    <p>Hora: {i.horario ? new Date(i.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "Não informada"}</p>
                                    <p>Atividade: {i.atividade}</p>
                                    <p>Formato: {i.formato}</p>
                                    <p>Local/Link: {i.LocalLink}</p>

                                </div>
                            </div>

                        ))
                    ) : (
                        <p className='text-light'>Nenhum Cronograma encontrado.</p>
                    )
                }
            </div>





        </div>
    )
}

export default Cronograma