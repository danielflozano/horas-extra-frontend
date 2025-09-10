import { useState } from "react"
import { OverTimeTable } from "@/components/horasExtra/OverTimeTable";

export const GenerateReport = () => {

  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleGenerarReporte = () => {
    setMostrarTabla(true);
  }

  return (
    <div>
      <div className="flex m-4">
        <button
          onClick={handleGenerarReporte}
          className="bg-epaColor text-white cursor-pointer w-1/3 rounded-2xl p-1 mx-auto block"
        >
          Generar Reporte
        </button>
        <button
          type="button"
          className="bg-epaColor text-white cursor-pointer w-1/3 rounded-2xl p-1 mx-auto block"
        >
          Generar Reporte Excel
        </button>
      </div>
      <div className="mt-5 space-y-6">
        <h3 className="text-center text-epaColor font-semibold text-3xl">Reporte</h3>
        {mostrarTabla && (
            <OverTimeTable/> 
        )}
        
        
      </div>
    </div>
  )
}