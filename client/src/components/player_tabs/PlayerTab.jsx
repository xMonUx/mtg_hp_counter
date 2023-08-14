import * as React from "react";

import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import { TabsData } from "./tabsData";

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

export default function BasicTabs() {
  const { iconsData, tabData, iconStyle} = TabsData();
  const [value, setValue] = React.useState(0);
  const sortedIconsData = [...iconsData].sort((a, b) => a.order - b.order);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main className="bg-gray-200 px-10 overflow-hidden dark:bg-slate-600 grid justify-center content-center">
      <section className="min-h-screen">
        <div className="mt-96 md:mt-16 max-w-xl">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Player info tabs"
          >
            {tabData.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                {...a11yProps(index)}
                icon={
                  <Avatar
                    alt={`test avatar ${index + 1}`}
                    src={tab.avatarSrc}
                  />
                }
              />
            ))}
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div className="grid grid-cols-2 grid-rows-4 gap-2 text-center">
              {sortedIconsData.map((iconData) => (
                <div key={iconData.id}>
                  <Tooltip title={iconData.tooltip} placement="right">
                    {iconData.icon &&
                      React.cloneElement(iconData.icon, { style: iconStyle })}

                    {iconData.text && (
                      <span className="text-3xl">{iconData.text}</span>
                    )}
                  </Tooltip>
                </div>
              ))}
            </div>
          </CustomTabPanel>
        </div>
      </section>
    </main>
  );
}
