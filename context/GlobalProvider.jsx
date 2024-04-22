import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        }
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLogged,
        setIsLogged,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// ! useContext hook must always be called inside a function
export const useGlobalContext = () => useContext(GlobalContext);
