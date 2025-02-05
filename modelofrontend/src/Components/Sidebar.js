// Sidebar.js
import React from "react";

function Sidebar({
  setSelectedFolder, // Función para actualizar la carpeta seleccionada
  carpetas, // Lista de carpetas obtenidas del backend
  categorias, // Lista de categorías obtenidas del backend
  setSelectedEmail, // Función para limpiar el correo seleccionado
}) {
  // Obtiene el nombre de usuario almacenado en localStorage
  const storedNombre = localStorage.getItem("nombreUsuario");

  /**
   * Función para obtener los mensajes de una carpeta o categoría
   * @param {string} nombre - Nombre de la carpeta/categoría
   */
  const getMensajes = (nombre) => {
    fetch(`http://localhost:8000/mensajes/${nombre}/${storedNombre}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        // Guarda los mensajes obtenidos en localStorage
        localStorage.setItem("mensajes", JSON.stringify(data));
        console.log("Mensajes guardados en localStorage:", data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  /**
   * Función auxiliar para esperar un tiempo determinado
   * @param {number} ms - Milisegundos a esperar
   * @returns {Promise} - Promesa que se resuelve después del tiempo especificado
   */
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Maneja la selección de una carpeta, obteniendo sus mensajes y limpiando el email seleccionado
   * @param {Object} folder - Objeto de la carpeta seleccionada
   */
  const esperar = async (folder) => {
    setSelectedFolder(folder.nombre); // Actualiza la carpeta seleccionada
    getMensajes(folder.id); // Obtiene los mensajes de la carpeta
    setSelectedEmail(null); // Limpia el correo seleccionado
    await wait(1000); // Espera un segundo (para simular una carga)
  };

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      {/* Sección de Carpetas */}
      <h2 className="text-lg font-bold">Carpetas</h2>
      <ul>
        {carpetas.map((folder) => (
          <li
            key={folder.id} // Usa el id como clave única
            className="cursor-pointer p-2 hover:bg-gray-300"
            onClick={() => esperar(folder)} // Llama a la función al hacer clic
          >
            {folder.nombre} {/* Muestra el nombre de la carpeta */}
          </li>
        ))}
      </ul>

      {/* Sección de Categorías */}
      <h2 className="text-lg font-bold">Categorías</h2>
      <ul>
        {categorias.map((category) => (
          <li
            key={category.id} // Usa el id como clave única
            className="cursor-pointer p-2 hover:bg-gray-300"
            onClick={() => {
              setSelectedFolder(category.nombre); // Cambia la carpeta seleccionada
              setSelectedEmail(null); // Limpia el email seleccionado
              getMensajes(category.id); // Obtiene los mensajes de la categoría
            }}
          >
            {category.nombre} {/* Muestra el nombre de la categoría */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
