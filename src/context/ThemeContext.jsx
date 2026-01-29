import useLocalstorage from "@/Hooks/useLocalstorage";
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalstorage("DARK_MODE", false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <ThemeContext value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext>
  );
};

export default ThemeProvider;
