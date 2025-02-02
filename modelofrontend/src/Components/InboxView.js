// InboxView.js
import React from "react";
import EmailItem from "./EmailItem";

function InboxView({ selectedFolder, setSelectedEmail }) {
    const emails = {
        Inbox: [
            { id: 1, subject: "Welcome!", sender: "admin@example.com", body: "Welcome to our service!" },
            { id: 2, subject: "Meeting Reminder", sender: "boss@example.com", body: "Don't forget our meeting at 3 PM." },
        ],
        Sent: [
            { id: 3, subject: "Project Update", sender: "me@example.com", body: "Here is the latest update on the project." },
        ],
        Drafts: [
            { id: 4, subject: "Unfinished Idea", sender: "me@example.com", body: "Still working on this idea..." },
        ],
        Trash: [],
    };

    return (
        <div className="w-3/4 p-4">
            <h2 className="text-lg font-bold">{selectedFolder}</h2>
            {emails[selectedFolder].length > 0 ? (
                emails[selectedFolder].map((email) => (
                    <EmailItem key={email.id} email={email} setSelectedEmail={setSelectedEmail} />
                ))
            ) : (
                <p>No emails in this folder.</p>
            )}
        </div>
    );
}

export default InboxView;
