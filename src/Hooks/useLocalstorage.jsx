// useLocalstorage.jsx
import React, { useEffect, useState } from "react";
const useLocalstorage = (key, initVal) => {

    const [value, setValue] = useState(() => {
        const storedVal = localStorage.getItem(key);
        return storedVal != null ? JSON.parse(storedVal) : initVal;
    })

    useEffect( () => {
        localStorage.setItem(key, JSON.stringify(value))
    } , [key, value])
    
  

  return [value, setValue];
};

export default useLocalstorage;
