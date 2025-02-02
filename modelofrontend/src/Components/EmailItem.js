// EmailItem.js
import React from "react";

function EmailItem({ email, setSelectedEmail }) {
    return (
        <div className="flex">
        <div className="w-56 border border-5 border-red-300 p-2 cursor-pointer hover:bg-gray-100" onClick={() => setSelectedEmail(email)}>
            <p className="font-bold">{email.subject}</p>
            <p className="text-sm text-gray-600">From: {email.sender}</p>
        </div>
        <div className="border border-5 border-red-300 p-2 cursor-pointer hover:bg-gray-100 w-4/5" onClick={() => setSelectedEmail(email)}>
            <p>{email.body}</p>
        </div>
        <div className="border border-5 border-red-300 p-2 cursor-pointer hover:bg-gray-100" onClick={() => setSelectedEmail(email)}>
        <p>{email.date}</p>

        </div>
        </div>
    );
}

export default EmailItem;
