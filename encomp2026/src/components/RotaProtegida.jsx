import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const RotaProtegida = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/verificaAdmin", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => {
        if (res.ok) {
          setAutenticado(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar autenticação:", error);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <div>Verificando acesso...</div>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RotaProtegida;