import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-light w-100">
      <div 
        className="sticky-top w-100 bg-black border-bottom border-secondary d-flex align-items-center justify-content-between px-3 px-md-5" 
        style={{ height: '80px', zIndex: 1050 }}
      >
        <nav className="d-flex align-items-center">
          <ul className="list-unstyled d-flex flex-wrap align-items-center m-0 gap-3 gap-sm-4 mb-0">
            <li>
              <Link to="" className="text-light text-decoration-none fw-semibold small">
                Cadastrar Curso
              </Link>
            </li>
            <li>
              <Link to="cadastraPalestra" className="text-light text-decoration-none fw-semibold small">
                Cadastrar Palestra
              </Link>
            </li>
             <li>
              <Link to="cadastraPatrocinador" className="text-light text-decoration-none fw-semibold small">
                Cadastrar Patrocinador
              </Link>
            </li>
            <li>
              <Link to="cadastraEventos" className="text-light text-decoration-none fw-semibold small">
                Cadastrar Eventos Extras
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="flex-grow-1 p-3 p-md-4 w-100 bg-black text-light">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;