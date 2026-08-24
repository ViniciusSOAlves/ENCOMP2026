import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  const navigate = useNavigate();
  //variavel que ira gaudar senha e email digitados
  const [formData, setFormData] = useState({
    usuario: '',
    senha: ''
  });

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({usuario: formData.usuario, senha: formData.senha}),
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        window.alert("ADM não encontrado");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-3">
          {/* input do campo email */}
          <input
            name="usuario"
            type="usuario"
            required
            placeholder="user"
            onChange={handleChange}
            className="form-control form-control-lg bg-light border-0"
          />

          {/* input do campo senha */}
          <input
            name="senha"
            type="password"
            required
            placeholder="Senha"
            onChange={handleChange}
            className="form-control form-control-lg bg-light border-0"
          />
        </div>

        {/* botao submit */}
        <button
          type="submit"
          className="btn btn-success w-100 py-2 mt-4 fw-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default AdminLogin