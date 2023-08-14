import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DangerousIcon from "@mui/icons-material/Dangerous";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import Battery6BarIcon from "@mui/icons-material/Battery6Bar";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useSocket } from "../../socketConnection/socketConnection";

const defaultUser = {
  label: localStorage.getItem("username"),
  avatarSrc: "",
};

export function TabsData() {
  const storedUserData = localStorage.getItem("userData");
  const initialUsers = storedUserData ? JSON.parse(storedUserData) : [defaultUser];
  const [users, setUsers] = useState(initialUsers);
  const { socket } = useSocket();

  useEffect(() => {
    socket.on("new_user_response", (data) => {
        setUsers(data);
        localStorage.setItem("userData", JSON.stringify(data));
    });

    socket.on("disconnect", () => {
      const updatedUsers = users.filter(
        (user) => user.storedUsername !== localStorage.getItem("username")
      );
      setUsers(updatedUsers);
      localStorage.setItem("userData", JSON.stringify(updatedUsers));
    });

    return () => {
      socket.off("new_user_response");
      socket.off("disconnect");
    };
  }, [socket, users]);

  const tabData = users.map((user) => ({
    label: user.storedUsername,
    avatarSrc: user.avatarSrc,
  }));

  const iconsData = [
    {
      id: 1,
      icon: <AddIcon />,
      text: "",
      tooltip: "Increase health",
      order: 1,
    },
    {
      id: 2,
      icon: <RemoveIcon />,
      text: "",
      tooltip: "Decrease health",
      order: 7,
    },
    {
      id: 3,
      icon: null,
      text: "40",
      tooltip: "Current health",
      order: 3,
    },
    {
      id: 4,
      icon: <DangerousIcon />,
      text: "",
      tooltip: "Increase Poison",
      order: 2,
    },
    {
      id: 5,
      icon: <StarIcon />,
      text: "",
      tooltip: "Increase experience",
      order: 4,
    },
    {
      id: 6,
      icon: <Battery6BarIcon />,
      text: "",
      tooltip: "Increase energy",
      order: 6,
    },
    {
      //Empty field for grid
      id: 7,
      icon: null,
      text: "",
      tooltip: "",
      order: 5,
    },
    {
      id: 8,
      icon: <LocalActivityIcon />,
      text: "",
      tooltip: "Increase tickets",
      order: 7,
    },
  ];

  const iconStyle = {
    fontSize: "40px",
  };

  return {
    iconsData,
    tabData,
    iconStyle,
  };
}

export default TabsData;
