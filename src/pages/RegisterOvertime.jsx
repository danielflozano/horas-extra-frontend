import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { funcionariosService, horasExtraService } from '../services';
import {   Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
 } from '@/components/ui/dialog';
import { OverTimeRecordTable } from '@/components/horasExtra/OverTimeRecordTable';

export const RegisterOvertime = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [registroHorasExtra, setRegistroHorasExtra] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const getFuncionarios = async () => {
      try {
        const res = await funcionariosService.listar();
        setFuncionarios(res.data);
      } catch (error) {
        console.error('Error cargando funcionarios', error);
      }
    };

    getFuncionarios();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await horasExtraService.crearExtras(data);      
      
      setRegistroHorasExtra(response.data);
      reset();
      setIsError(false);
      setModalMessage('Horas extra registradas con éxito')
      setOpenModal(true);
    } catch (error) {
      const msg = error.response?.data?.message || 'Ocurrio un error al registrar las horas extra ❌';
      console.error('Error registrando horas extra', error);
      setIsError(true);
      setModalMessage(msg);
      setOpenModal(true);
    }
  };

  console.log(registroHorasExtra);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-epaColor text-center text-3xl font-extrabold pb-10">
        Registro de Horas Extra
      </h2>
      <form
        className="bg-white p-5 w-1/2 rounded-xl shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="pb-5">
          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">Funcionario</span>
            <select
              className="border border-gray-500 rounded-md p-1"
              {...register('FuncionarioAsignado', {
                required: true,
              })}
            >
              <option value="">Seleccione un funcionario</option>
              {funcionarios.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.nombre_completo}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-6 pb-5">
          <div className="flex justify-between items-center">
            <label className="flex flex-col w-4/5">
              <span className="text-epaColor font-semibold">
                Fecha Inicio Trabajo
              </span>
              <input
                type="date"
                className="border border-gray-500 rounded-md p-1"
                {...register('fecha_inicio_trabajo', {
                  required:
                    'La fecha de inicio de la jornada laboral es obligatoria',
                })}
              />
            </label>

            <label className="flex flex-col">
              <span className="text-epaColor font-semibold">Festivo</span>
              <input type="checkbox" {...register('es_festivo_Inicio')} />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">
              Hora Inicio Trabajo
            </span >
            <input
              type="time"
              className="border border-gray-500 rounded-md p-1"
              {...register('hora_inicio_trabajo', {
                required:
                  'La hora de inicio de la jornada laboral es obligatoria',
              })}
            />
          </label>

          <div className="flex justify-between items-center">
            <label className="flex flex-col w-4/5">
              <span className="text-epaColor font-semibold">
                Fecha Fin Trabajo
              </span>
              <input
                type="date"
                className="border border-gray-500 rounded-md p-1"
                {...register('fecha_fin_trabajo', {
                  required:
                    'La fecha de culminación de la jornada laboral es obligatoria',
                })}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-epaColor font-semibold">Festivo</span>
              <input type="checkbox" {...register('es_festivo_Fin')} />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">
              Hora Fin Trabajo
            </span>
            <input
              type="time"
              className="border border-gray-500 rounded-md p-1"
              {...register('hora_fin_trabajo', {
                required:
                  'La hora de culminación de la jornada laboral es obligatoria',
              })}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">
              Fecha Inicio Descanso
            </span>
            <input
              type="date"
              className="border border-gray-500 rounded-md p-1"
              {...register('fecha_inicio_descanso', {
                required: 'La fecha de inicio del descanso es obligatoria',
              })}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">
              Hora Inicio Descanso
            </span>
            <input
              type="time"
              className="border border-gray-500 rounded-md p-1"
              {...register('hora_inicio_descanso', {
                required: 'La hora de inicio del descanso es obligatoria',
              })}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">
              Fecha Fin Descanso
            </span>
            <input
              type="date"
              className="border border-gray-500 rounded-md p-1"
              {...register('fecha_fin_descanso', {
                required: 'La fecha de culminación del descanso es obligatoria',
              })}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-epaColor font-semibold">
              Hora Fin Descanso
            </span>
            <input
              type="time"
              className="border border-gray-500 rounded-md p-1"
              {...register('hora_fin_descanso', {
                required: 'La hora de culminación del descanso es obligatoria',
              })}
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-epaColor text-white w-1/2 rounded-2xl p-1 mx-auto block"
        >
          Registrar
        </button>
      </form>

      <OverTimeRecordTable data={registroHorasExtra} />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isError ? 'Error' : 'Registro Exitoso'}</DialogTitle>
            <DialogDescription>{modalMessage}</DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setOpenModal(false)}
            className="bg-epaColor text-white w-1/2 rounded-2xl p-1 mx-auto block"
          >Cerrar</button>
        </DialogContent>
      </Dialog>
    </div>

  );
};


