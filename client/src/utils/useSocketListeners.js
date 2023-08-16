import { useEffect } from "react";

export function useSocketListeners(socket, users, setUsers) {
    useEffect(() => {
      const handleNewUserResponse = (data) => {
        setUsers(data);
        localStorage.setItem("userData", JSON.stringify(data));
      };
  
      const handleDisconnect = () => {
        const updatedUsers = users.filter(
          (user) => user.storedUsername !== localStorage.getItem("username")
        );
        setUsers(updatedUsers);
        localStorage.setItem("userData", JSON.stringify(updatedUsers));
      };
  
      socket.on("new_user_response", handleNewUserResponse);
      socket.on("disconnect", handleDisconnect);
  
      return () => {
        socket.off("new_user_response", handleNewUserResponse);
        socket.off("disconnect", handleDisconnect);
      };
    }, [socket, users, setUsers]);
  }
