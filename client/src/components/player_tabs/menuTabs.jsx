import * as React from "react";

import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
          <Typography component={"span"}>{children}</Typography>
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

const tabData = [
  {
    label: "{storedUsername}",
    avatarSrc: "",
  },
  {
    label: "Player2",
    avatarSrc: "/static/images/avatar/2.jpg",
  },
  {
    label: "Player3",
    avatarSrc: "/static/images/avatar/3.jpg",
  },
];

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="Player info tabs">
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            {...a11yProps(index)}
            icon={
              <Avatar alt={`test avatar ${index + 1}`} src={tab.avatarSrc} />
            }
          />
        ))}
      </Tabs>
    </>
  );
}
