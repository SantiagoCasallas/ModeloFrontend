import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
  // Estado para almacenar los mensajes agrupados
  const [mensajesAgrupados, setMensajesAgrupados] = useState([]);

  // Función auxiliar para esperar un tiempo determinado (simula un pequeño retraso)
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const cargarMensajes = async () => {
      await wait(100); // Esperar un breve tiempo para asegurar la actualización de selectedFolder

      // Obtener los mensajes almacenados en localStorage
      const storedMensajes = localStorage.getItem("mensajes");
      let mensajes = [];

      try {
        mensajes = storedMensajes ? JSON.parse(storedMensajes) : [];
      } catch (error) {
        console.error("Error al parsear mensajes:", error);
        mensajes = [];
      }

      // Verificar que los mensajes sean un array válido
      if (!Array.isArray(mensajes)) {
        console.error("mensajes no es un array:", mensajes);
        mensajes = [];
      }

      // Agrupar mensajes por ID y separar destinatarios según visibilidad (CO y COO)
      const agrupados = Object.values(
        mensajes.reduce((acc, mensaje) => {
          if (!mensaje || !mensaje.id) return acc; // Validación de mensaje

          const { id, destinatarios, ...rest } = mensaje;

          // Si el mensaje aún no está en el acumulador, se inicializa
          if (!acc[id]) {
            acc[id] = { ...rest, id, co: [], coo: [] };
          }

          // Clasificar los destinatarios en CO y COO
          destinatarios.forEach(({ destinatario, visibilidad }) => {
            if (visibilidad === "CO") acc[id].co.push(destinatario);
            if (visibilidad === "COO") acc[id].coo.push(destinatario);
          });

          return acc;
        }, {})
      ).map((mensaje) => ({
        ...mensaje,
        co: mensaje.co.join(", "), // Convertir array de CO en una cadena de texto
        coo: mensaje.coo.join(", "), // Convertir array de COO en una cadena de texto
      }));

      // Actualizar el estado con los mensajes agrupados
      setMensajesAgrupados(agrupados);
    };

    cargarMensajes();
  }, [selectedFolder]); // Se ejecuta cada vez que cambia la carpeta seleccionada

  // Definir la estructura de las columnas según la carpeta seleccionada
  const isRecibidos = selectedFolder === "Recibido";
  const columnas = isRecibidos
    ? ["Remitente", "CO", "Asunto", "Preview", "Fecha"] // Columnas para la bandeja de entrada
    : ["CO", "COO", "Asunto", "Preview", "Fecha"]; // Columnas para enviados

  return (
    <div className="w-3/4 p-4">
      {/* Título de la carpeta seleccionada */}
      <h2 className="text-lg font-bold mb-2">{selectedFolder}</h2>

      {/* Encabezado de la tabla */}
      <div className="grid grid-cols-5 gap-2 bg-gray-200 p-2 rounded-md font-bold">
        {columnas.map((columna, index) => (
          <p key={index}>{columna}</p>
        ))}
      </div>

      {/* Mostrar los correos o un mensaje si la lista está vacía */}
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
