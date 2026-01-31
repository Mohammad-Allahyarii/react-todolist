import React, { useEffect } from "react";

const Box = ({ children, className, style }) => {


  return (
    <div
    style={style}
      className={`rounded-xl hover:scale-[100.1%] hover:border-my-dark/80 duration-300 border-my-dark/40 shadow shadow-my-dark/10 border backdrop-blur-sm bg-my-light/30 py-2 px-2 ${className.trim()}`}
    >
      {children}
    </div>

   
  );
};

export default Box;
