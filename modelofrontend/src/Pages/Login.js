import React, { useState } from 'react';

function Login() {
  const [nombre, setNombre] = useState(''); // Estado para el nombre del usuario
  const [user, setUsuario] = useState([]); // Estado para almacenar los datos del usuario

  const login = () => {
    // Verifica que el nombre no esté vacío
    if (!nombre) {
      alert("Por favor, ingresa un nombre de usuario.");
      return;
    }
    // Realiza la solicitud fetch
    fetch(`http://localhost:8000/user/${nombre}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setUsuario(data);
        localStorage.setItem("nombreUsuario", nombre); // Guarda en localStorage
        console.log("Usuario guardado en localStorage:", nombre);
        window.location.replace("/Inicio");
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            id="nombre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={login}
        >
          Iniciar sesión
        </button>

      </div>
    </div>
  );
}

export default Login;