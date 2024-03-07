import { createContext, useState } from "react";
export const DarkContext = createContext();

export const DarkProvider = ({ children }) => {
  const [isDark, SetIsDark] = useState(false);

  return (
    <DarkContext.Provider value={{ isDark, SetIsDark }}>
      {children}
    </DarkContext.Provider>
  );
};
