import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Imagen from "../imagenes/contacto.jpg";

function Navbar() {
  const [dateTime, setDateTime] = useState(new Date());
  const [showNewMail, setShowNewMail] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [showContactListCOO, setShowContactListCOO] = useState(false);
  const [contactos, setContactos] = useState([]);
  const [coValue, setCoValue] = useState(""); // Estado del input CO
  const [cooValue, setCooValue] = useState(""); // Estado del input COO
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileType, setFileType] = useState("txt");

  const storedNombre = localStorage.getItem("nombreUsuario");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewMailClick = () => {
    setShowNewMail(true);
    getContactos();
  };

  const handleCloseNewMail = () => {
    setShowNewMail(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("nombreUsuario");
    navigate("/Login");
  };

  const toggleContactList = () => {
    setShowContactList(!showContactList);
  };
  const toggleContactListCOO = () => {
    setShowContactListCOO(!showContactListCOO);
  };

  const getContactos = () => {
    fetch(`http://localhost:8000/contactos/${storedNombre}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setContactos(data);
        localStorage.setItem("contactos", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        alert("Error al obtener los datos. Por favor, intenta de nuevo.");
      });
  };

  const agregarContacto = (contacto, esCOO = false) => {
    if (esCOO) {
      setCooValue((prev) => (prev ? `${prev}, ${contacto}` : contacto));
    } else {
      setCoValue((prev) => (prev ? `${prev}, ${contacto}` : contacto));
    }
    setContactos((prev) => prev.filter((c) => c.contacto !== contacto));
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedFiles = files.map((file) => ({
      name: file.name,
    }));
    setSelectedFiles([...selectedFiles, ...updatedFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSendMail = async (event) => {
    event.preventDefault();

    const destinatarios = [];

    if (coValue) {
      coValue.split(",").forEach((correo) => {
        destinatarios.push({ correo: correo.trim(), visibilidad: "CO" });
      });
    }

    if (cooValue) {
      cooValue.split(",").forEach((correo) => {
        destinatarios.push({ correo: correo.trim(), visibilidad: "COO" });
      });
    }

    const archivos = selectedFiles.map((file) => file.name);

    const mailData = {
      usuario: storedNombre,
      asunto: document.querySelector("input[placeholder='Agregar un asunto']")
        .value,
      mensaje: document.querySelector(
        "textarea[placeholder='Escribe tu mensaje']"
      ).value,
      destinatarios:destinatarios,
      archivos:archivos
    };

    try {
      const response = await fetch("http://localhost:8000/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo");
      }

      alert("Correo enviado correctamente");
      handleCloseNewMail();
    } catch (error) {
      console.error("Error en el envío del correo:", error);
      alert("Hubo un problema al enviar el correo");
    }
  };

  return (
    <div className="relative">
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
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </div>

      {showNewMail && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="p-6 rounded shadow-lg w-96 bg-gray-300 relative">
            <h2 className="text-xl font-semibold mb-4">Nuevo Correo</h2>
            <form>
              <div className="mb-4 flex items-center">
                <label className="w-12 mx-2">Para</label>
                <label className="border-2 border-black text-center w-16 mx-2">
                  CO
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Escribe el destinatario"
                  value={coValue}
                  onChange={(e) => setCoValue(e.target.value)}
                />
                <img
                  src={Imagen}
                  alt="Contacto"
                  className="ml-2 cursor-pointer w-8 h-8"
                  onClick={toggleContactList}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-12 mx-2"></label>
                <label className="border-2 border-black text-center w-16 mx-2">
                  COO
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Escribe el destinatario"
                  value={cooValue}
                  onChange={(e) => setCooValue(e.target.value)}
                />
                <img
                  src={Imagen}
                  alt="Contacto"
                  className="ml-2 cursor-pointer w-8 h-8"
                  onClick={toggleContactListCOO}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Agregar un asunto"
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Escribe tu mensaje"
                />
              </div>

              <div className="mb-4  ">
                <label className="block">Adjuntar Archivos:</label>

                <input
                  type="file"
                  className=" w-full "
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              <div className="bg-white p-2 border rounded mb-4">
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Archivos adjuntos"
                  value={selectedFiles.map((file) => file.name).join("\n")}
                  readOnly
                />
              </div>
              <ul className="mb-4">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {file.name}
                    <span
                      className="text-red-500 ml-2 cursor-pointer"
                      onClick={() => handleRemoveFile(index)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>

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
                  onClick={handleSendMail}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>

          {showContactList && (
            <div className="p-6 rounded shadow-lg w-96 bg-gray-300 relative">
              <h3 className="text-lg font-bold mb-4">Lista de Contactos</h3>
              <div className="overflow-y-auto h-3/4">
                {contactos.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{contact.contacto}</span>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => agregarContacto(contact.contacto, false)}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showContactListCOO && (
            <div className="p-6 rounded shadow-lg w-96 bg-gray-300 relative">
              <h3 className="text-lg font-bold mb-4">Lista de Contactos COO</h3>
              <div className="overflow-y-auto h-3/4">
                {contactos.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{contact.contacto}</span>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => agregarContacto(contact.contacto, true)}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
