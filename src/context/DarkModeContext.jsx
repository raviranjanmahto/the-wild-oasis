import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode(prev => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
