import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
  const [mensajesAgrupados, setMensajesAgrupados] = useState([]);

  // Función para esperar
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

      // Agrupar por id y combinar destinatarios
      const agrupados = Object.values(
        mensajes.reduce((acc, mensaje) => {
          if (!mensaje || !mensaje.id) return acc;

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

      console.log("Mensajes agrupados:", agrupados);
      setMensajesAgrupados(agrupados);
    };

    cargarMensajes();
  }, [selectedFolder]); // Se ejecuta cada vez que selectedFolder cambia

  // Definir estructura según la carpeta seleccionada
  const isRecibidos = selectedFolder === "Recibido";
  const columnas = isRecibidos
    ? ["Remitente", "Destinatarios", "Asunto", "Preview", "Fecha"]
    : ["Destinatarios", "COO", "Asunto", "Preview", "Fecha"];

  return (
    <div className="w-3/4 p-4">
      <h2 className="text-lg font-bold mb-2">{selectedFolder}</h2>
      <div className="grid grid-cols-5 gap-2 bg-gray-200 p-2 rounded-md font-bold">
        {columnas.map((columna, index) => (
          <p key={index} className="">{columna}</p>
        ))}
      </div>
      {mensajesAgrupados.length > 0 ? (
        mensajesAgrupados.map((men) => (
          <EmailItem
            key={men.id}
            email={men}
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