// Navbar.js
import React, { useState, useEffect } from "react";

function Navbar() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
            <div>

            <div className="text-lg font-bold">BD.edu.co</div>
            <div className="flex items-center gap-4">
            <button className="bg-blue-500 px-4 py-2 rounded text-white">Nuevo Correo</button>
            </div>
            </div>
            <div>
                <span className="font-semibold mr-5">User</span>
                <span>{dateTime.toLocaleString()}</span>

            </div>
        </div>
    );
}

export default Navbar;
