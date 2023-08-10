import React, { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Tooltip from "@mui/material/Tooltip";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <nav className="py-5 px-5 mb-12 flex justify-between">
      <h1 className="text-xl font-bold font-burtons">Magic: The Battle APP</h1>
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
        <li></li>
      </ul>
    </nav>
  );
}

export default Navbar;
