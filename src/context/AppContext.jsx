import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [planets, setPlanets] = useState([]);

  return (
    <AppContext.Provider value={{ spacecrafts, setSpacecrafts, planets, setPlanets }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;