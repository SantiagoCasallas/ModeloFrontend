// EmailDetail.js
import React from "react";

function EmailDetail({ email, setSelectedEmail }) {
  const storedNombre = localStorage.getItem("nombreUsuario");

  
  return (
    <div className="w-3/4 p-4">
      <button
        onClick={() => setSelectedEmail(null)}
        className="mb-4 text-blue-500"
      >
        Back
      </button>
      <div className=" grid grid-cols-5">
        <h2 className="text-xl font-bold col-span-4">
          From: {email.destinatario}
        </h2>
        <button className="bg-blue-300 border rounded"
        onClick={{}}>Reenviar</button>
      </div>
      <p className="text-sm text-gray-600">Asunto:{email.asunto}</p>
      <p className="text-sm text-gray-600">{email.fecha}</p>
      <p className="mt-4">{email.mensaje}</p>
    </div>
  );
}

export default EmailDetail;
