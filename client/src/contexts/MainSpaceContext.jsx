import { createContext, useState } from "react";

const MainSpaceContext = createContext();

const MainSpaceProvider = ({ children }) => {
  const [mainSpaceWidth, setMainSpaceWidth] = useState(0);

  const updateMainSpaceWidth = (width) => {
    setMainSpaceWidth(width);
  };

  return (
    <MainSpaceContext.Provider value={{ mainSpaceWidth, updateMainSpaceWidth }}>
      {children}
    </MainSpaceContext.Provider>
  );
};

export { MainSpaceContext, MainSpaceProvider };
