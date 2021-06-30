import React, { useState, createContext, useContext } from "react";
import Auth from "@aws-amplify/auth";

export const UserContext = createContext();

const getUser = async () => {
  const [user, setUser] = useState(null);
  try {
    setUser(await Auth.currentAuthenticatedUser());
  } catch (err) {
    console.log("This is an error " + err);
  }
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

// HOC - High Order Component
export const withUser = (Wrapped) => (props) => {
  const [user, setUser] = useState(null);
  React.useEffect(async () => {
    try {
      const remoteUser = await Auth.currentAuthenticatedUser();
      setUser(remoteUser);
      console.log("set user" + remoteUser);
    } catch (error) {
      console.log("This is an error " + error);
    }
  }, []);

  return (
    <UserContext.Provider user={user}>
      <Wrapped {...props} />
    </UserContext.Provider>
  );
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  React.useEffect(async () => {
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
