// EmailDetail.js
import React from "react";

function EmailDetail({ email, setSelectedEmail }) {
    return (
        <div className="w-3/4 p-4">
            <button onClick={() => setSelectedEmail(null)} className="mb-4 text-blue-500">Back</button>
            <h2 className="text-xl font-bold">{email.subject}</h2>
            <p className="text-sm text-gray-600">From: {email.sender}</p>
            <p className="mt-4">{email.body}</p>
        </div>
    );
}

export default EmailDetail;
