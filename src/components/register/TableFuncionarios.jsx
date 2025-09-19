import { useEffect, useState } from "react";
import { funcionariosService } from "@/services";

export const TableFuncionarios = ({ onBack }) => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [funcionarioSeleccionado, setFuncionarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // ✅ cargar todos los funcionarios al montar
  useEffect(() => {
    getFuncionarios();
  }, []);

  const getFuncionarios = async () => {
    try {
      const response = await funcionariosService.listarFuncionarios();
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Error cargando funcionarios", error);
    }
  };

  const loadFuncionariosActivos = async () => {    
    try {
      const response = await funcionariosService.listarFuncionariosActivos();
      setFuncionarios(response.data.filter((f) => f.estado === "Activo"));
    } catch (error) {
      console.error("Error filtrando funcionarios activos", error);
    }
  };

  const getFuncionarioById = async (id) => {    
    if (!id) return;
    try {
      const response = await funcionariosService.listarFuncionarioPorId(id);
      setFuncionarios(response.data? [response.data] : []);
    } catch (error) {
      console.error("Error buscando funcionario", error);
      setFuncionarios([]);
    }
  };

  const abrirFormulario = (funcionario) => {
    setFuncionarioSeleccionado(funcionario);
    setMostrarModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="bg-epaColor text-white p-2 w-30 rounded-4xl border-2 border-transparent hover:bg-transparent hover:text-epaColor hover:border-epaColor hover:font-semibold hover:scale-105 transform transition duration-300 ease-in-out"
      >
        Regresar
      </button>
      {/* Botones e input */}
      <div className="bg-white w-1/2 p-4 rounded-2xl flex flex-row items-center justify-center gap-4 mb-4 mx-auto">
        <button
          onClick={getFuncionarios}
          className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
        >
          Todos
        </button>
        <button
          onClick={loadFuncionariosActivos}
          className="bg-green-200 px-4 py-2 rounded-md cursor-pointer"
        >
          Activos
        </button>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getFuncionarioById(searchId)}
          className="border px-2 py-1 rounded-md"
        />
        <button
          onClick={() => getFuncionarioById(searchId)}
          className="bg-[#002d72] hover:bg-blue-700 text-white px-3 py-2 rounded-lg cursor-pointer"
        >
          🔍
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg w-[400px] p-6 lg:w-[1200px] mx-auto">
        <table className="w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-epaColor h-8 text-left text-sm font-semibold text-white uppercase">
            <tr>
              <th className="py-4">Identificación</th>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Tipo de Operario</th>
              <th>Estado</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {funcionarios.map((func) => (
              <tr
                key={func._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-2">{func.identificacion}</td>
                <td>{func.nombre_completo}</td>
                <td>{func.Cargo?.name ?? "Sin cargo asignado"}</td>
                <td>{func.tipoOperario}</td>
                <td>{func.estado}</td>
                <td>
                  <button
                    onClick={() => abrirFormulario(func)}
                    className="text-[#002d72] hover:text-blue-800 cursor-pointer"
                  >
                    🔄
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensaje cuando no hay resultados */}
        {funcionarios.length === 0 && (
          <div className="text-center text-xl text-gray-500 font-semibold py-8">
            No se encontraron funcionarios
          </div>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && funcionarioSeleccionado && (
        <div className="fixed inset-0 bg-epaColor/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Editar Funcionario</h3>

            <label className="block mb-2">Nombre:</label>
            <input
              type="text"
              value={funcionarioSeleccionado.nombre_completo}
              onChange={(e) =>
                setFuncionarioSeleccionado({
                  ...funcionarioSeleccionado,
                  nombre_completo: e.target.value,
                })
              }
              className="border p-2 w-full rounded mb-4"
            />

            <label className="block mb-2">Estado:</label>
            <select
              value={funcionarioSeleccionado.estado}
              onChange={(e) =>
                setFuncionarioSeleccionado({
                  ...funcionarioSeleccionado,
                  estado: e.target.value,
                })
              }
              className="border p-2 w-full rounded mb-4"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                // onClick={}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Guardar
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
