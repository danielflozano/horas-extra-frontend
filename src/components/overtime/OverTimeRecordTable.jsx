export const OverTimeRecordTable = ({ data }) => {
  const renderRow = (label, value, isDate = false) => {
    if (!value) return null;
    return (
      <tr>
        <td className="px-4 py-2 font-semibold">{label}</td>
        <td className="px-4 py-2">
          {isDate ? new Date(value).toISOString().split('T')[0] : value}
        </td>
      </tr>
    );
  };

  if (!data || Object.keys(data).length === 0)
    return <p className="mt-5 text-epaColor font-semibold">No hay Registro</p>;

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
          <td className="px-4 py-2">
            {data.FuncionarioAsignado.nombre_completo}
          </td>
        </tr>

        {renderRow('Fecha Inicio Trabajo', data.fecha_inicio_trabajo, true)}
        {renderRow('Fecha Fin Trabajo', data.fecha_fin_trabajo, true)}
        {renderRow('Hora Inicio Trabajo', data.hora_inicio_trabajo)}
        {renderRow('Hora Fin Trabajo', data.hora_fin_trabajo)}

        {renderRow('Fecha Inicio Descanso', data.fecha_inicio_descanso, true)}
        {renderRow('Fecha Fin Descanso', data.fecha_fin_descanso, true)}
        {renderRow('Hora Inicio Descanso', data.hora_inicio_descanso)}
        {renderRow('Hora Fin Descanso', data.hora_fin_descanso)}

        <tr>
          <td className="px-4 py-2 font-semibold">Festivo Inicio</td>
          <td className="px-4 py-2">{data.es_festivo_Inicio ? 'Sí' : 'No'}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-semibold">Festivo Fin</td>
          <td className="px-4 py-2">{data.es_festivo_Fin ? 'Sí' : 'No'}</td>
        </tr>
      </tbody>
    </table>
  );
};