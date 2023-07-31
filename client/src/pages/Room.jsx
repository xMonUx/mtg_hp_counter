import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Room() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <span>Current room: </span>

        <Card sx={{ maxWidth: 900 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                T
              </Avatar>
            }
            title="{playerData.name}"
            subheader="Cavalry Charge"
          />
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Tomek" {...a11yProps(0)} />
                  <Tab label="Marcin" {...a11yProps(1)} />
                  <Tab label="Michał" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <Typography>health: </Typography>
                <Typography>poison: </Typography>
                <Typography>experience: </Typography>
                <Typography>energy: </Typography>
                <Typography>tickets: </Typography>
                <Typography>
                  <Button>Add 1 Health</Button>
                </Typography>
                <Typography>
                  <Button>Remove 1 Health</Button>
                </Typography>

                <Typography>Loading player info...</Typography>
              </CustomTabPanel>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
