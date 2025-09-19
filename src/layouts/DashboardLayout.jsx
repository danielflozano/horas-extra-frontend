
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logoepa.png';
import { useAuth } from '@/context/AuthContext';

const currentYear = new Date().getFullYear();

export const DashboardLayout = () => {

  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      <div className='bg-gray-50 w-1/6 flex-col justify-between p-4 border-r border-gray-300'>
        <div className='space-y-4 pb-4 text-center'>
          <img src={logo} alt="Logo EPA" />
          <h3 className='text-epaColor text-lg font-bold'>Menu Principal</h3>
          <h4 className='font-medium'>Version 1.0</h4>
        </div>
        <nav className='space-y-4'>
          <div className='text-epaColor font-medium'>
            <Link to={ '/dashboard' }>Inicio</Link>
          </div>
          <div className='text-epaColor font-medium'>
            <Link to={ '/dashboard/overtime' }>Horas Extra</Link>
          </div>
          <div className='text-epaColor font-medium'>
            <Link to={ '/dashboard/register' }>Funcionario</Link>
          </div>
          <div className='text-epaColor font-medium'>
            <Link to={ '/dashboard/generate-report' }>Reportes</Link>
          </div>
          <button
            type="button"
            onClick={logout}
            className="bg-red-700 text-white min-w-9/10 rounded-2xl p-2 mx-auto block hover:bg-red-800 transform hover:scale-105"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>

      <div className='flex flex-col w-full'>
        <header className='bg-epaColor text-white p-4 text-center font-bold text-3xl'>
          Plataforma Horas Extra - EPA
        </header>

        <main className='bg-gray-200 flex-1 overflow-auto p-4'>
          <Outlet />
        </main>

        <footer className='bg-epaColor text-white flex justify-between items-center p-4'>
          <div>
            © {currentYear} Empresas Publicas de Armenia E.S.P.
          </div>
          <div>
            Plataforma de Horas Extra Aseo - EPA
          </div>
          <div>
            Contacto de Soporte: <a href="mailto:redes.tic@epa.gov.co">redes.tic&#64;epa.gov.co</a>
            <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
          </div>
        </footer>
      </div>
    </div>
  )
}