import React, { useState } from 'react';

function Login() {
  // Estado para almacenar el nombre ingresado por el usuario
  const [nombre, setNombre] = useState('');

  // Estado para almacenar los datos del usuario obtenidos del backend
  const [user, setUsuario] = useState([]);

  // Función para manejar el proceso de inicio de sesión
  const login = () => {
    // Verifica que el campo de nombre no esté vacío
    if (!nombre) {
      alert("Por favor, ingresa un nombre de usuario.");
      return;
    }

    // Realiza una solicitud GET al backend para obtener los datos del usuario
    fetch(`http://localhost:8000/user/${nombre}`)
      .then((response) => {
        // Verifica si la respuesta es válida
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json(); // Convierte la respuesta en formato JSON
      })
      .then((data) => {
        // Guarda los datos del usuario en el estado
        setUsuario(data);

        // Almacena el nombre del usuario en localStorage
        localStorage.setItem("nombreUsuario", nombre);
        console.log("Usuario guardado en localStorage:", nombre);

        // Redirige al usuario a la página de inicio después del inicio de sesión exitoso
        window.location.replace("/Inicio");
      })
      .catch((error) => {
        // Manejo de errores en caso de que falle la solicitud
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  return (
    // Contenedor principal que centra el formulario de inicio de sesión en la pantalla
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Tarjeta de inicio de sesión con estilos de Tailwind CSS */}
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        {/* Título del formulario */}
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Campo de entrada para el nombre de usuario */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            id="nombre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al escribir
          />
        </div>

        {/* Botón para iniciar sesión */}
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={login} // Llama a la función de inicio de sesión al hacer clic
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Login;
