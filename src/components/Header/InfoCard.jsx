import React, { useLayoutEffect } from "react";
import Box from "../ui/Box";

const InfoCard = ({ name, Icon, count, color }) => {

  return (
    <Box className={`flex items-center justify-between text-primary`} >
      <div className={`flex gap-2`}>
        <span>
          <Icon  />
        </span>
        <span className="text-my-dark">{name}</span>
      </div>
      <span className="text-primary">{count}</span>
    </Box>
  );
};

export default InfoCard;
