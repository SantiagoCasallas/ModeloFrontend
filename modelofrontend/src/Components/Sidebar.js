// Sidebar.js
import React from "react";

function Sidebar({
  setSelectedFolder,
  carpetas,
  categorias,
  setSelectedEmail,
}) {
  const selectedFolder = setSelectedFolder.nombre;
  const storedNombre = localStorage.getItem("nombreUsuario");
  const getMensajes = (nombre) => {
    fetch(`http://localhost:8000/mensajes/${nombre}/${storedNombre}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("mensajes", JSON.stringify(data)); // Guarda en localStorage
        console.log("Las categorias guardadas en localStorage:", data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const esperar = async (folder) => {
    setSelectedFolder(folder.nombre);
    getMensajes(folder.id);
    setSelectedEmail(null);
    await wait(1000);
  };

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold">Carpetas</h2>
      <ul>
        {carpetas.map((folder) => (
          <li
            key={folder.id} // Usa la propiedad "nombre" como key
            className="cursor-pointer p-2 hover:bg-gray-300"
            onClick={() => {
              esperar(folder);
            }}
            //={() => } // Usa "nombre" aquí
          >
            {folder.nombre} {/* Renderiza la propiedad "nombre" */}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold">Categorias</h2>
      <ul>
        {categorias.map((category) => (
          <li
            key={category.id} // Usa la propiedad "nombre" como key
            className="cursor-pointer p-2 hover:bg-gray-300"
            onClick={() => {
              setSelectedFolder(category.nombre);
              setSelectedEmail(null);
              getMensajes(category.id);
            }}
          >
            {category.nombre} {/* Renderiza la propiedad "nombre" */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
