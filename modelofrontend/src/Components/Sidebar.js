// Sidebar.js
import React from "react";

function Sidebar({ setSelectedFolder, carpetas, setSelectedEmail }) {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-bold">Carpetas</h2>
      <ul>
        {carpetas.map((folder) => (
          <li
            key={folder.id} // Usa la propiedad "nombre" como key
            className="cursor-pointer p-2 hover:bg-gray-300"
            onClick={() =>{ setSelectedFolder(folder.nombre) ;setSelectedEmail(null);}}
            //={() => } // Usa "nombre" aquí
          >

            {folder.nombre} {/* Renderiza la propiedad "nombre" */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;