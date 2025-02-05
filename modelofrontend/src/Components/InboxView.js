import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
  const [mensajesAgrupados, setMensajesAgrupados] = useState([]);


  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const cargarMensajes = async () => {
      await wait(100); // Esperar un breve tiempo para asegurar la actualización de selectedFolder
      

      const storedMensajes = localStorage.getItem("mensajes");
      let mensajes = [];

      try {
        mensajes = storedMensajes ? JSON.parse(storedMensajes) : [];
      } catch (error) {
        console.error("Error al parsear mensajes:", error);
        mensajes = [];
      }

      if (!Array.isArray(mensajes)) {
        console.error("mensajes no es un array:", mensajes);
        mensajes = [];
      }

      // Agrupar mensajes por ID y separar destinatarios según visibilidad
      const agrupados = Object.values(
        mensajes.reduce((acc, mensaje) => {
          if (!mensaje || !mensaje.id) return acc;

          const { id, destinatarios, ...rest } = mensaje;

          if (!acc[id]) {
            acc[id] = { ...rest, id, co: [], coo: [] };
          }

          destinatarios.forEach(({ destinatario, visibilidad }) => {
            if (visibilidad === "CO") acc[id].co.push(destinatario);
            if (visibilidad === "COO") acc[id].coo.push(destinatario);
          });

          return acc;
        }, {})
      ).map((mensaje) => ({
        ...mensaje,
        co: mensaje.co.join(", "), // Unir los destinatarios CO en una cadena
        coo: mensaje.coo.join(", "), // Unir los destinatarios COO en una cadena
      }));

      setMensajesAgrupados(agrupados);
    };

    cargarMensajes();
  }, [selectedFolder]);

  // Definir estructura de columnas según la carpeta seleccionada
  const isRecibidos = selectedFolder === "Recibido";
  const columnas = isRecibidos
    ? ["Remitente", "CO", "Asunto", "Preview", "Fecha"]
    : ["CO", "COO", "Asunto", "Preview", "Fecha"];

  return (
    <div className="w-3/4 p-4">
      <h2 className="text-lg font-bold mb-2">{selectedFolder}</h2>
      <div className="grid grid-cols-5 gap-2 bg-gray-200 p-2 rounded-md font-bold">
        {columnas.map((columna, index) => (
          <p key={index}>{columna}</p>
        ))}
      </div>
      {mensajesAgrupados.length > 0 ? (
        mensajesAgrupados.map((mensaje) => (
          <EmailItem
            key={mensaje.id}
            email={mensaje}
            selectedFolder={selectedFolder}
            setSelectedEmail={setSelectedEmail}
          />
        ))
      ) : (
        <p className="text-center mt-2">No hay correos en esta carpeta.</p>
      )}
    </div>
  );
}

export default InboxView;
