import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import InboxView from "../Components/InboxView";
import EmailDetail from "../Components/EmailDetail";
import Navbar from "../Components/Navbar";

function Inicio(usuario) {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [carpetas, setCarpetas] = useState([]);
    

    const [selectedFolder, setSelectedFolder] = useState("Recibidos");
  
    // Función para obtener las carpetas
  const getCarpetas = () => {
    fetch(`http://localhost:8000/carpetas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setCarpetas(data); // Actualiza el estado con las carpetas obtenidas
        localStorage.setItem("carpetas", JSON.stringify(data)); // Guarda en localStorage
        console.log("Las carpetas guardadas en localStorage:", data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  // Llama a getCarpetas cuando el componente se monta
  useEffect(() => {
    getCarpetas();
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar setSelectedFolder={setSelectedFolder} />
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
