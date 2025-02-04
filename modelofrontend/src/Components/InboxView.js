// InboxView.js
import React, { useState } from "react";
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
  const storedCarpetas = localStorage.getItem("carpetas");
  const storedNombre = localStorage.getItem("nombreUsuario");
    const [mensajesC, setMensajesC] = useState([]);
  
  setMensajesC(localStorage.getItem("mensajes")); 


  console.log(storedCarpetas);

  // const emails = {
  //   Recibidos: [
  //     {
  //       id: 1,
  //       subject: "¡Bienvenido!",
  //       sender: "admin@example.com",
  //       co: "",
  //       date: "10/12/02",
  //       body: "¡Bienvenido a nuestro servicio!",
  //     },
  //     {
  //       id: 2,
  //       subject: "Recordatorio de reunión",
  //       sender: "jefe@example.com",
  //       co: "",
  //       date: "10/12/02",
  //       body: "No olvides nuestra reunión a las 3 PM.",
  //     },
  //   ],
  //   Enviado: [
  //     {
  //       id: 3,
  //       subject: "Actualización del proyecto",
  //       sender: "yo@example.com",
  //       co: "",
  //       coo: "",
  //       date: "10/12/02",
  //       body: "Aquí está la última actualización del proyecto.",
  //     },
  //   ],
  //   Borrador: [
  //     {
  //       id: 4,
  //       subject: "Idea sin terminar",
  //       sender: "yo@example.com",
  //       date: "10/12/02",
  //       body: "Todavía estoy trabajando en esta idea...",
  //     },
  //   ],
  //   Basura: [],
  //   Otros: [
  //     {
  //       id: 5,
  //       subject: "una cosa",
  //       sender: "yotas@unacosa",
  //       date: "10/12/02",
  //       body: "mirame",
  //     },
  //   ],
  // };


  const emails={
    selectedFolder: [


     
    ]
  
  }

  const getEmailsByFolder = (folderName) => {
    return emails[folderName] || []; // Devuelve el array de correos o un array vacío si no existe
    const correos=folderName    
  };

  const currentEmails = emails[selectedFolder] || [];
  const emailsToShow = getEmailsByFolder(selectedFolder);

  return (
    <div className="w-3/4 p-4">
      <div>
        <h2 className="text-lg font-bold">{selectedFolder}</h2>
        {currentEmails.length > 0 ? (
          currentEmails.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              setSelectedEmail={setSelectedEmail}
            />
          ))
        ) : (
          <p>No hay correos en esta carpeta.</p>
        )}
      </div>
      
      <div className="flex">
        {emailsToShow.map((email) => (
          <div key={email.id} className="email-item flex w-full">
            <h3>{email.subject}</h3>
            <p>De: {email.sender}</p>
            <p>Fecha: {email.date}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-bold">{selectedFolder}</h2>
        {emailsToShow.length > 0 ? (
          emailsToShow.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              setSelectedEmail={setSelectedEmail}
            />
          ))
        ) : (
          <p>No hay correos en esta carpeta.</p>
        )}
      </div>
      <div>
        {mensajesC.length>0?(
          mensajesC.map((men)=>(
            <EmailItem
            key={men.id}
            email={men}
            setSelectedEmail={setSelectedEmail}

            />
          ))
        ):(
          <p>No hay correos en esta carpeta.</p>

        )}
      </div>
    </div>
  );
}

export default InboxView;
