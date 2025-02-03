import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Imagen from '../imagenes/contacto.jpg';

function Navbar() {
  const [dateTime, setDateTime] = useState(new Date());
  const [showNewMail, setShowNewMail] = useState(false);
  const storedNombre = localStorage.getItem("nombreUsuario");
  const navigate = useNavigate(); // Obtén la función de navegación

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewMailClick = () => {
    setShowNewMail(true);
  };

  const handleCloseNewMail = () => {
    setShowNewMail(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("nombreUsuario"); // Elimina el nombre de usuario del localStorage
    navigate("/Login"); // Redirige a la ruta /Login
  };

  return (
    <div>
      <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <div className="text-lg font-bold">BD.edu.co</div>
          <div className="flex items-center gap-4">
            <button
              className="bg-blue-500 px-4 py-2 rounded-xl text-white"
              onClick={handleNewMailClick}
            >
              Nuevo Correo
            </button>
          </div>
        </div>
        <div>
          <span className="font-semibold mr-5">{storedNombre}</span>
          <span>{dateTime.toLocaleString()}</span>
          <button
            className="bg-blue-500 px-4 py-2 rounded-xl text-white mx-4"
            onClick={handleLogout} // Llama a la función handleLogout
          >
            Salir
          </button>
        </div>
      </div>

      {/* Interfaz de nuevo correo */}
      {showNewMail && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="p-6 rounded shadow-lg w-96 bg-gray-300">
            <h2 className="text-xl font-semibold mb-4">Nuevo Correo</h2>
            <form>
              <div className="mb-4 flex">
                <label className="w-12 block mb-2 mx-2" htmlFor="to">
                  Para
                </label>
                <label className="border-2 border-black text-center w-16 block mx-2 mb-2" htmlFor="to">
                  CO
                </label>
                <input
                  type="email"
                  id="to"
                  className="w-full p-2 border rounded "
                  placeholder="Escribe el destinatario"
                />
                <button className="  w-1/6">
                  <img src={Imagen} alt="Contacto" className="ml-2"/>
                </button>
              </div>
              <div className="mb-4 flex">
                <label className="w-12 block  mx-2  mb-2" htmlFor="to"></label>
                <label className="border-2 border-black text-center w-16 block mx-2 mb-2" htmlFor="to">
                  CCO
                </label>
                <input
                  type="email"
                  id="to"
                  className="w-full p-2 border rounded"
                  placeholder="Escribe el destinatario"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="subject"
                  className="w-full p-2 border rounded"
                  placeholder="Agregar un asunto"
                />
              </div>
              <div className="mb-4">
                <textarea
                  id="body"
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Escribe tu mensaje"
                />
                <div>
                  <label>Lista de archivos</label>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 px-4 py-2 rounded text-white"
                  onClick={handleCloseNewMail}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;