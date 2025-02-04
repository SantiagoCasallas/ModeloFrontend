import React from "react";

function EmailItem({ email, setSelectedEmail }) {
  return (
    <div className="flex">
      {/* Columna de Destinatarios CO */}
      <div
        className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => setSelectedEmail(email)}
      >
        <p className="text-sm text-gray-600">{email.destinatarios}</p>
        
      </div>

      {/* Columna de Destinatarios COO */}
      <div
        className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => setSelectedEmail(email)}
      >
        <p className="text-sm text-gray-600">{email.visibilidad}</p>
      </div>

      {/* Columna de Asunto */}
      <div
        className="w-1/7 border border-red-300 p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => setSelectedEmail(email)}
      >
        <p>{email.asunto}</p>
      </div>

      {/* Columna de Mensaje */}
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
    </div>
  );
}

export default EmailItem;
