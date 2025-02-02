// InboxView.js
import React, { useState } from 'react';
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
    const storedCarpetas = localStorage.getItem("carpetas");
    console.log(storedCarpetas);

 const emails = {
     Recibidos: [
         { id: 1, subject: "¡Bienvenido!", sender: "admin@example.com", co:"",date:"10/12/02",body: "¡Bienvenido a nuestro servicio!" },
            { id: 2, subject: "Recordatorio de reunión", sender: "jefe@example.com", co:"", date:"10/12/02", body: "No olvides nuestra reunión a las 3 PM." },
        ],
        Enviados: [
            { id: 3, subject: "Actualización del proyecto", sender: "yo@example.com", co:"", coo:"", date:"10/12/02", body: "Aquí está la última actualización del proyecto." },
        ],
        Borradores: [
            { id: 4, subject: "Idea sin terminar", sender: "yo@example.com", date:"10/12/02", body: "Todavía estoy trabajando en esta idea..." },
        ],
        Basura: [],
        Otros:[{id: 5, subject:"una cosa", sender:"yotas@unacosa", date:"10/12/02", body: "mirame"}],

    };




    const currentEmails = emails[selectedFolder] || [];

    return (
        <div className="w-3/4 p-4">
            <h2 className="text-lg font-bold">{selectedFolder}</h2>
            {currentEmails.length > 0 ? (
                currentEmails.map((email) => (
                    <EmailItem key={email.id} email={email} setSelectedEmail={setSelectedEmail} />
                ))
            ) : (
                <p>No hay correos en esta carpeta.</p>
            )}
        </div>
    );
}

export default InboxView;
