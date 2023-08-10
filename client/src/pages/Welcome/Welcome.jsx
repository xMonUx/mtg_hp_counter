import React, { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SettingsIcon from "@mui/icons-material/Settings";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

function Welcome() {
  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const maxLength = 20;

  const handleTextFieldClick = () => {
    setIsClicked(!isClicked); // Toggle the isClicked state
  };

  const LargerIcon = styled(SettingsIcon)({
    fontSize: 60,
  });

  const randomNames = [
    "Wizard123",
    "SorcererMagic",
    "EnchantingPlayer",
    "MysticalMage",
    "SmallPenis123",
    "GiantBalls123",
    "EtherealWitch",
    "ArcaneWarlock",
    "SpellbindingSage",
    "MythicalMagician",
    "CunningConjuror",
    "MysticScroll",
    "EnigmaticEnchanter",
    "SpectralSorcery",
    "ShadowySpellcaster",
    "WanderingWizard",
    "CelestialSorceress",
    "AstralWarlock",
    "EnchantedIllusionist",
    "OracleOfMagic",
    "ArcaneJourneyman",
    "MysticalMarauder",
    "EpicEnchanter",
    "WhisperingWitch",
    "RuneboundMage",
    "WiseWizardry",
  ];

  useEffect(() => {
    document.title = "Welcome to Magic: The Battle APP!";
    // Generate a random index for the randomNames array
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    // Set the random name as the initial username
    setUsername(randomNames[randomIndex]);

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handlePlayClick = () => {
    localStorage.setItem("username", username);
    navigate("/home");
  };

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
              <li></li>
            </ul>
          </nav>
          <div className="text-center text-2xl mt-96">
            <h1 className="py-5">Choose your username</h1>
            <ul>
              <li>
                <TextField
                  id="outlined-textarea"
                  label="Username"
                  placeholder={username}
                  multiline
                  onClick={handleTextFieldClick}
                  inputProps={{ maxLength: maxLength }}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {isClicked && <p className="text-sm">Max 20 characters allowed!</p>}
              </li>
              <li className="mt-5">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handlePlayClick}
                >
                  Play
                </Button>
              </li>
            </ul>
          </div>
          <footer className="absolute bottom-0 py-5 mb-12">
            <Tooltip title="Settings" placement="top">
              <LargerIcon className="cursor-pointer" />
            </Tooltip>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Welcome;
