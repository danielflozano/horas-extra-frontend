export const OverTimeRecordTable = ({ data }) => {
  if (!data || Object.keys(data).length === 0) return <p className="mt-5 text-epaColor font-semibold">No hay Registro</p>;

  return (
      <table className="mt-5 w-1/2 border border-gray-300 shadow-2xl rounded-xl overflow-hidden">
        <thead className="bg-epaColor text-white">
          <tr>
            <th className="px-4 py-2 text-left">Campo</th>
            <th className="px-4 py-2 text-left">Valor</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 font-semibold">Funcionario Asignado</td>
            <td className="px-4 py-2">{data.FuncionarioAsignado.nombre_completo}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Fecha Inicio Trabajo</td>
            <td className="px-4 py-2">
              {new Date(data.fecha_inicio_trabajo).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Fecha Fin Trabajo</td>
            <td className="px-4 py-2">
              {new Date(data.fecha_fin_trabajo).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Hora Inicio Trabajo</td>
            <td className="px-4 py-2">{data.hora_inicio_trabajo}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Hora Fin Trabajo</td>
            <td className="px-4 py-2">{data.hora_fin_trabajo}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Fecha Inicio Descanso</td>
            <td className="px-4 py-2">
              {new Date(data.fecha_inicio_descanso).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Fecha Fin Descanso</td>
            <td className="px-4 py-2">
              {new Date(data.fecha_fin_descanso).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Hora Inicio Descanso</td>
            <td className="px-4 py-2">{data.hora_inicio_descanso}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Hora Fin Descanso</td>
            <td className="px-4 py-2">{data.hora_fin_descanso}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Festivo Inicio</td>
            <td className="px-4 py-2">
              {data.es_festivo_Inicio ? 'Sí' : 'No'}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Festivo Fin</td>
            <td className="px-4 py-2">{data.es_festivo_Fin ? 'Sí' : 'No'}</td>
          </tr>
        </tbody>
      </table>
  );
};
