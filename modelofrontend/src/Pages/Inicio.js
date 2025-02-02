// App.js
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import InboxView from "../Components/InboxView";
import EmailDetail from "../Components/EmailDetail";
import Navbar from "../Components/Navbar";


function Inicio() {
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
      <div className="h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-1">
              <Sidebar setSelectedFolder={setSelectedFolder} />
              {selectedEmail ? (
                  <EmailDetail email={selectedEmail} setSelectedEmail={setSelectedEmail} />
              ) : (
                  <InboxView selectedFolder={selectedFolder} setSelectedEmail={setSelectedEmail} />
              )}
          </div>
      </div>
  );
}

export default Inicio;