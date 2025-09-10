import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from '../assets/logoepa.png';


export const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = ( data ) => {

    try {
      console.log( data );
      
    } catch ( error ) {
      console.error( error );
      
    }

  };
  

  return (
    <div className="bg-epaColor flex justify-center items-center h-screen">
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-epaColor text-2xl font-bold text-center p-6">Iniciar Sesion</h2>
          <div className="pb-4">
            <label className="text-epaColor block pb-2 font-medium">Correo Electronico</label>
            <input
              type="email"
              className="w-full p-1 border rounded"
              { ...register( 'email', {
                required: 'El correo electronico es obligatorio'
              })}
            />
              { errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

          </div>

          <div className="pb-4">
            <label className="text-epaColor block pb-2 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full p-1 border rounded"
              { ...register( 'password', {
                required: 'La contraseña es obligatoria',
                minLength: { value:8, message:'Minimo 8 caracteres' }
              })}
            />
              { errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

          </div>
          <button
            type="submit"
            className="bg-epaColor w-full text-white rounded-xl hover:bg-blue-100 hover:text-epaColor p-1.5 mb-4"
          >
            Ingresar
          </button>

        </form>
        <div className="text-center">
          <p>¿No recuerda su contraseña? haga click <Link to={ '/register' } className="text-blue-500 font-bold">Aqui</Link></p>
          
        </div>

      </div>
    </div>
  )
}