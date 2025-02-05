import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import InboxView from "../Components/InboxView";
import EmailDetail from "../Components/EmailDetail";
import Navbar from "../Components/Navbar";

function Inicio(usuario) {
  // Estado para almacenar la carpeta seleccionada, por defecto "Recibido"
  const [selectedFolder, setSelectedFolder] = useState("Recibido");

  // Estado para almacenar el correo seleccionado
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Estado para almacenar las carpetas obtenidas del servidor
  const [carpetas, setCarpetas] = useState([]);

  // Estado para almacenar las categorías obtenidas del servidor
  const [categorias, setCategorias] = useState([]);

  // Función para obtener las carpetas desde el backend
  const getCarpetas = () => {
    fetch(`http://localhost:8000/carpetas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((data) => {
        setCarpetas(data); // Guarda las carpetas en el estado
        localStorage.setItem("carpetas", JSON.stringify(data)); // Almacena en localStorage
        console.log("Las carpetas guardadas en localStorage:", data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  // Función para obtener las categorías desde el backend
  const getCategorias = () => {
    fetch(`http://localhost:8000/categorias`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((data) => {
        setCategorias(data); // Guarda las categorías en el estado
        localStorage.setItem("categorias", JSON.stringify(data)); // Almacena en localStorage
        console.log("Las categorías guardadas en localStorage:", data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  // useEffect para obtener carpetas y categorías cuando el componente se monta
  useEffect(() => {
    getCarpetas();
    getCategorias();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="h-screen flex flex-col">
      {/* Barra de navegación */}
      <Navbar />
      
      {/* Contenedor principal con Sidebar y vista de correos */}
      <div className="flex flex-1">
        {/* Barra lateral que recibe las carpetas y categorías como props */}
        <Sidebar
          setSelectedFolder={setSelectedFolder}
          carpetas={carpetas}
          categorias={categorias}
          setSelectedEmail={setSelectedEmail}
        />

        {/* Muestra el detalle del correo si hay uno seleccionado, de lo contrario, muestra la bandeja */}
        {selectedEmail ? (
          <EmailDetail
            email={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />
        ) : (
          <InboxView
            selectedFolder={selectedFolder}
            setSelectedEmail={setSelectedEmail}
          />
        )}
      </div>
    </div>
  );
}

export default Inicio;
