import React from "react";

function EmailItem({ email, selectedFolder, setSelectedEmail }) {
  return (
    // Contenedor principal del email con diseño de cuadrícula y efectos de hover
    <div className="grid grid-cols-5 border border-gray-300 cursor-pointer hover:bg-gray-100">
      
      {/* Si la carpeta seleccionada es "Recibido", mostrar remitente y destinatarios CO */}
      {selectedFolder === "Recibido" ? (
        <>
          {/* Remitente del correo */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm text-gray-600">{email.remitente}</p>
          </div>

          {/* Destinatarios CO (Con Copia) */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm">{email.co}</p>
          </div>
        </>
      ) : (
        // Si la carpeta es distinta a "Recibido", mostrar destinatarios CO y COO
        <>
          {/* Destinatarios CO (Con Copia) */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm">{email.co}</p>
          </div>

          {/* Destinatarios COO (Con Copia Oculta) */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm">{email.coo}</p>
          </div>
        </>
      )}

      {/* Asunto del correo */}
      <div className="p-2" onClick={() => setSelectedEmail(email)}>
        <p>{email.asunto}</p>
      </div>

      {/* Vista previa del mensaje (se muestra un máximo de 30 caracteres) */}
      <div className="p-2" onClick={() => setSelectedEmail(email)}>
        <p className="text-gray-600">
          {email.mensaje.length > 30 
            ? `${email.mensaje.slice(0, 29)}...` // Si es muy largo, cortar y agregar "..."
            : email.mensaje}
        </p>
      </div>

      {/* Fecha del correo */}
      <div className="p-2" onClick={() => setSelectedEmail(email)}>
        <p>{email.fecha}</p>
      </div>
      
    </div>
  );
}

export default EmailItem;
