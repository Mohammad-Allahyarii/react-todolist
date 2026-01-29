import React from "react";

const Background = () => {
  return (
    <div className="fixed -z-999 w-full h-full inset-0 bg-my-light">
      <div className="animate-circle w-40 h-40 -top-20 bg-primary left-20 rounded-full blur-xl fixed"></div>
      <div className='animate-circle w-100 h-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary/30 rounded-full blur-[100px] fixed'></div>


    </div>
  );
};

export default Background;
