import React from "react";

function EmailItem({ email, selectedFolder, setSelectedEmail }) {
  return (
    <div className="grid grid-cols-5 border border-gray-300 cursor-pointer hover:bg-gray-100">
      {selectedFolder === "Recibido" ? (
        <>
          {/* Remitente */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm text-gray-600">{email.remitente}</p>
          </div>

          {/* Destinatarios */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm text-gray-600">{email.destinatarios}</p>
          </div>

          {/* Asunto */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p>{email.asunto}</p>
          </div>

          {/* Preview (Mensaje) */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p>{email.mensaje}</p>
          </div>

          {/* Fecha */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p>{email.fecha}</p>
          </div>
        </>
      ) : (
        <>
          {/* Destinatarios */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm text-gray-600">{email.destinatarios}</p>
          </div>

          {/* COO */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p className="text-sm text-gray-600">
              {email.visibilidad === "COO" ? email.destinatarios : ""}
            </p>
          </div>

          {/* Asunto */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p>{email.asunto}</p>
          </div>

          {/* Preview (Mensaje) */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p>{email.mensaje}</p>
          </div>

          {/* Fecha */}
          <div className="p-2" onClick={() => setSelectedEmail(email)}>
            <p>{email.fecha}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default EmailItem;
