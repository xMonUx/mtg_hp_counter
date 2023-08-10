import React, { useState, useEffect } from "react";
import "./Home.css";
import { Navbar } from "../../components";
import RoomModal from "../../components/tabs/CreateTab";
import JoinModal from "../../components/tabs/JoinTab";

//Icons
import AddIcon from "@mui/icons-material/Add";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import SettingsIcon from "@mui/icons-material/Settings";

//MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const LargerIcon = styled(SettingsIcon)({
    fontSize: 60,
  });

  return (
    <div>
      <main className="bg-gray-200 px-10 overflow-hidden dark:bg-slate-600">
        <section className="min-h-screen">
          <Navbar />
          <div className=" text-2xl mt-96 flex justify-center">
            <div className=" ">
              <Box sx={{ bgcolor: "background.paper", width: 500 }}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab
                      label="Create room"
                      {...a11yProps(0)}
                      icon={<AddIcon />}
                    />
                    <Tab
                      label="Join room"
                      {...a11yProps(1)}
                      icon={<AccessibleForwardIcon />}
                    />
                  </Tabs>
                </AppBar>

                <TabPanel
                  value={value}
                  index={0}
                  dir={theme.direction}
                  className="justify-center"
                >
                  <RoomModal />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <JoinModal />
                </TabPanel>
              </Box>
            </div>
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
