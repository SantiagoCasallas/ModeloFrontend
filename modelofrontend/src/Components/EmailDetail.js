// Importación de React
import React from "react";

// Componente funcional EmailDetail que recibe email y setSelectedEmail como props
function EmailDetail({ email, setSelectedEmail }) {
 
  return (
    <div className="w-3/4 p-4">
      {/* Botón para volver, que cuando se hace clic ejecuta setSelectedEmail(null) */}
      <button
        onClick={() => setSelectedEmail(null)} // Resetear el email seleccionado
        className="mb-4 text-blue-500"
      >
        Back {/* Texto del botón */}
      </button>
      
      {/* Contenedor para mostrar el remitente del correo */}
      <div className="grid grid-cols-5">
        {/* Título con el nombre del remitente, ocupa 4 columnas del grid */}
        <h2 className="text-xl font-bold col-span-4">
          From: {email.destinatario} {/* Mostrar el destinatario del correo */}
        </h2>
      </div>

      {/* Mostrar el asunto del correo */}
      <p className="text-sm text-gray-600">Asunto: {email.asunto}</p>
      
      {/* Mostrar la fecha del correo */}
      <p className="text-sm text-gray-600">{email.fecha}</p>
      
      {/* Si existen archivos adjuntos, mostrar sus nombres */}
      {email.archivos && email.archivos.length > 0 && (
        <p className="mt-4">
          <strong>Archivos adjuntos:</strong>{" "}
          {/* Mostrar los nombres de los archivos adjuntos */}
          {email.archivos.map((archivo) => archivo.nombre).join(" ")}
        </p>
      )}
    </div>
  );
}

// Exportación del componente para su uso en otras partes de la aplicación
export default EmailDetail;
