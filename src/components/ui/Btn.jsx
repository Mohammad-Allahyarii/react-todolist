import React from "react";

const Btn = ({
  children,
  onClickHandler = null,
  className,
  btnType,
  onMouseDownHandler,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onMouseDown={onMouseDownHandler}
      type={btnType}
      onClick={onClickHandler}
      className={`${className} ${disabled ? "cursor-not-allowed! opacity-50!" : ""} bg-primary shadow-[0_0_25px_4px] shadow-primary/50 py-1 px-4 text-white rounded-[8px] cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Btn;
