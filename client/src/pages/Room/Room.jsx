import React, { useState, useEffect } from "react";
import { useSocket } from "../../socketConnection/socketConnection";

import { PlayerTab } from "../../components";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Tooltip from "@mui/material/Tooltip";

function Room() {
  const [users, setUsers] = useState([]);
  const { socket } = useSocket();
  const storedUsername = localStorage.getItem("username");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  useEffect(() => {
    socket.on("new_user_response", (data) => setUsers(data));
    console.log(users);
  }, [socket, users]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-gray-200 px-10 overflow-hidden dark:bg-slate-600">
        <section className="min-h-screen ">
          <nav className="py-5 px-5 mb-12 flex justify-between">
            <h1 className="text-xl font-bold font-burtons">
              Magic: The Battle APP
            </h1>
            <ul className="flex items-center">
              <li>
                <Tooltip title="Darkmode" placement="bottom">
                  {darkMode ? (
                    <WbSunnyIcon
                      className="cursor-pointer"
                      fontSize="large"
                      onClick={() => setDarkMode(!darkMode)}
                    />
                  ) : (
                    <DarkModeIcon
                      className="cursor-pointer"
                      fontSize="large"
                      onClick={() => setDarkMode(!darkMode)}
                    />
                  )}
                </Tooltip>
              </li>
            </ul>
          </nav>
          <div className="text-2xl">
            <PlayerTab />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Room;
