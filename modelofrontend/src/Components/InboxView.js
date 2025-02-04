import React, { useState } from "react";
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
  const storedMensajes = localStorage.getItem("mensajes");

  // Intentar parsear solo si storedMensajes es un JSON válido
  let mensajes = [];
  try {
    mensajes = storedMensajes ? JSON.parse(storedMensajes) : [];
  } catch (error) {
    console.error("Error al parsear mensajes:", error);
    mensajes = []; // En caso de error, asigna un array vacío
  }

  // Verificar si mensajes es realmente un array antes de usar reduce()
  if (!Array.isArray(mensajes)) {
    console.error("mensajes no es un array:", mensajes);
    mensajes = [];
  }

  // Agrupar por id y combinar destinatarios
  const mensajesAgrupados = Object.values(
    mensajes.reduce((acc, mensaje) => {
      if (!mensaje || !mensaje.id) return acc; // Ignorar mensajes inválidos

      const { id, destinatario, ...rest } = mensaje;

      if (!acc[id]) {
        acc[id] = { ...rest, id, destinatarios: new Set() };
      }

      acc[id].destinatarios.add(destinatario);
      return acc;
    }, {})
  ).map((mensaje) => ({
    ...mensaje,
    destinatarios: Array.from(mensaje.destinatarios).join(", "),
  }));

  console.log("Mensajes agrupados:", mensajesAgrupados);

  return (
    <div className="w-3/4 p-4">
      <h2 className="text-lg font-bold">{selectedFolder}</h2>
      <div className="flex">
        <p className="text-lg font-bold mx-5 w-1/7">Destinatarios</p>
        <p className="text-lg font-bold mx-5 w-1/7">COO</p>
        <p className="text-lg font-bold mx-5 w-1/7">Asunto</p>
        <p className="text-lg font-bold mx-5 w-3/7">Preview</p>
        <p className="text-lg font-bold mx-5 w-1/7">Fecha</p>
      </div>
      {mensajesAgrupados.length > 0 ? (
        mensajesAgrupados.map((men) => (
          <EmailItem key={men.id} email={men} setSelectedEmail={setSelectedEmail} />
        ))
      ) : (
        <p>No hay correos en esta carpeta.</p>
      )}
    </div>
  );
}

export default InboxView;
