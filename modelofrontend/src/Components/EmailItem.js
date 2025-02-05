import React from "react";

function EmailItem({ email, selectedFolder, setSelectedEmail }) {
  return (
    <div className="grid grid-cols-5 border  border-gray-300 cursor-pointer hover:bg-gray-100">
      {selectedFolder === "Recibido" ? (
        <>
          {/* Remitente */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm text-gray-600">{email.remitente}</p>
          </div>

          {/* Destinatarios CO */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm">{email.co}</p>
          </div>
        </>
      ) : (
        <>
          {/* Destinatarios CO */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm">{email.co}</p>
          </div>

          {/* Destinatarios COO */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm">{email.coo}</p>
          </div>
        </>
      )}

      {/* Asunto */}
      <div className="p-2" onClick={() => setSelectedEmail(email)}>
        <p>{email.asunto}</p>
      </div>

      {/* Preview (Mensaje) */}
      <div className="p-2" onClick={() => setSelectedEmail(email)}>
  <p className="text-gray-600">
    {email.mensaje.length > 30 
      ? `${email.mensaje.slice(0, 29)}...` 
      : email.mensaje}
  </p>
</div>

      {/* Fecha */}
      <div className="p-2" onClick={() => setSelectedEmail(email)}>
        <p>{email.fecha}</p>
      </div>
    </div>
  );
}

export default EmailItem;
