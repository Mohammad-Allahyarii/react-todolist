import React from "react";
import { useTheme } from "@/Hooks/useTheme";
import { Moon, Sun1 } from "iconsax-reactjs";


const ToggleTheme = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex justify-end items-center cursor-pointer`}
    >
      {darkMode ? (
        <Sun1 size="24" className="fill-my-dark" variant="Bold" />
      ) : (
        <Moon size="24" className="fill-my-dark" variant="Bold" />
      )}
    </button>
  );
};

export default ToggleTheme;
