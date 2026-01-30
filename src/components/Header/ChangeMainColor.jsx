import useLocalstorage from "@/Hooks/useLocalstorage";
import React, { useEffect } from "react";

export const ChangeMainColor = () => {

  const [mainColor, setMainColor] = useLocalstorage('main-color', '#3b82f6');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", mainColor); 
  }, [mainColor]);

const changeMainColorHandler = (e) => { 

    const selectedColor = e.target.value;
    setMainColor(selectedColor);

}

  return (
    <>
      <label
        htmlFor="theme-color"
        className="flex gap-2 flex-row-reverse items-center cursor-pointer border p-1 rounded-[8px] hover:bg-my-dark/10 transition"
      >
        <span className="bg-primary block min-h-4 min-w-4 rounded-full"></span>
        <span className="text-sm">Change main color!</span>
      </label>

      <input id="theme-color" onChange={changeMainColorHandler} type="color" hidden />
    </>
  );
};
