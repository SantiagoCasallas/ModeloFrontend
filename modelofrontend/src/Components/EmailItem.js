// EmailItem.js
import React from "react";

function EmailItem({ email, setSelectedEmail }) {
    return (
        <div className="border-b p-2 cursor-pointer hover:bg-gray-100" onClick={() => setSelectedEmail(email)}>
            <p className="font-bold">{email.subject}</p>
            <p className="text-sm text-gray-600">From: {email.sender}</p>
        </div>
    );
}

export default EmailItem;
