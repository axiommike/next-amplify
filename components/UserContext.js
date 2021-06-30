import React, { useState, createContext, useContext, useEffect } from "react";
import Auth from "@aws-amplify/auth";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    try {
      const remoteUser = await Auth.currentAuthenticatedUser();
      setUser(remoteUser);
      console.log("set user");
    } catch (error) {
      console.log("This is an error " + error);
    }
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
