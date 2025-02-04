import React from "react";

function EmailItem({ email, selectedFolder, setSelectedEmail }) {
  return (
    <div className="flex">
      {selectedFolder === "Recibido" ? (
        <>
          {/* Columna de Remitente */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p className="text-sm text-gray-600">{email.remitente}</p>
          </div>

          {/* Columna de Destinatarios */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p className="text-sm text-gray-600">{email.destinatarios}</p>
          </div>

          {/* Columna de Asunto */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p>{email.asunto}</p>
          </div>

          {/* Columna de Fecha */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p>{email.mensaje}</p>
          </div>
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p>{email.fecha}</p>
          </div>
        </>
      ) : (
        <>
          {/* Columna de Destinatarios */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p className="text-sm text-gray-600">{email.destinatarios}</p>
          </div>

          {/* Columna de COO */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p className="text-sm text-gray-600">
              {email.visibilidad === "COO" ? email.destinatarios : ""}
            </p>
          </div>

          {/* Columna de Asunto */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p>{email.asunto}</p>
          </div>

          {/* Columna de Mensaje (Preview) */}
          <div
            className="w-3/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p>{email.mensaje}</p>
          </div>

          {/* Columna de Fecha */}
          <div
            className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <p>{email.fecha}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default EmailItem;
