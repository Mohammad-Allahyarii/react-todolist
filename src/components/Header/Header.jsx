import React from "react";
import Box from "../ui/Box";
import ToggleTheme from "./ToggleTheme";
import { APP_TITLE } from "@/data/constants";
import AddTask from "@/Futures/AddTask/AddTask";
import Infos from "./Infos";
import FilterTasks from "./FilterTasks";
import { ChangeMainColor } from "./ChangeMainColor";

const Header = () => {
  return (
    <header className="my-4 ">
      <Box className="flex justify-between items-center px-4">
        <h1>{APP_TITLE}</h1>
        <div className="flex gap-4 items-center">
          <ChangeMainColor />
          <ToggleTheme />
        </div>
      </Box>

      <Box className="mt-2">
        <AddTask />
      </Box>

      <Infos />
      <FilterTasks />
    </header>
  );
};

export default Header;
