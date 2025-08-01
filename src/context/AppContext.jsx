// src/context/AppContext.jsx
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [planets, setPlanets]         = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);

  return (
    <AppContext.Provider value={{
      planets, setPlanets,
      spacecrafts, setSpacecrafts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const ctx = useContext(AppContext);
  return ctx;
};
