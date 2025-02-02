// Sidebar.js
import React from "react";

function Sidebar({ setSelectedFolder }) {
    const folders = ["Recibidos", "Enviados", "Borradores", "Basura", "Otros"];
    
    return (
        <div className="w-1/4 bg-gray-200 p-4">
            <h2 className="text-lg font-bold">Carpetas</h2>
            <ul>
                {folders.map((folder) => (
                    <li key={folder} 
                        className="cursor-pointer p-2 hover:bg-gray-300"
                        onClick={() => setSelectedFolder(folder)}>
                        {folder}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
