
export const OverTimeTable = () => {
  return (
    <table className="table-auto border-collapse border border-gray-400 w-full text-center">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 px-2">Nombre Funcionario</th>
          <th className="border border-gray-400 px-2">HEDO</th>
          <th className="border border-gray-400 px-2">HENO</th>
          <th className="border border-gray-400 px-2">HEDF</th>
          <th className="border border-gray-400 px-2">HENF</th>
          <th className="border border-gray-400 px-2">HDF</th>
          <th className="border border-gray-400 px-2">HNF</th>
          <th className="border border-gray-400 px-2">RNO</th>
          <th className="border border-gray-400 px-2">Total Horas Extra</th>
        </tr>
      </thead>
      <tbody>
        {/* {registros.map((item) => (
          <tr key={item._id}>
            <td className="border border-gray-400 px-2">
              {item.FuncionarioAsignado?.nombre_completo}
            </td>
            <td className="border border-gray-400 px-2">{item.HEDO}</td>
            <td className="border border-gray-400 px-2">{item.HENO}</td>
            <td className="border border-gray-400 px-2">{item.HEDF}</td>
            <td className="border border-gray-400 px-2">{item.HENF}</td>
            <td className="border border-gray-400 px-2">{item.HDF}</td>
            <td className="border border-gray-400 px-2">{item.HNF}</td>
            <td className="border border-gray-400 px-2">{item.RNO}</td>
            <td className="border border-gray-400 px-2 font-bold">
              {item.totalHoras}
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  )
}