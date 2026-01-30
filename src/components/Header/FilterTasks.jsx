import React from "react";
import Box from "../ui/Box";
import { FILTERS } from "@/data/constants";
import { useTasks } from "@/Hooks/useTasks";
import { useTheme } from "@/Hooks/useTheme";

const FilterTasks = () => {
  const { setFilter } = useTasks();
  const { darkMode } = useTheme();

  const filterTasks = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex justify-end items-center mt-5 mb-12">
      <Box className="w-full">
        <select
          className={`*:outline-0 w-full outline-0 ${
            darkMode ? "*:text-my-light" : "*:text-my-dark"
          }`}
          onChange={filterTasks}
          name=""
          id=""
        >
          {Object.keys(FILTERS).map((filter) => (
            <option value={FILTERS[filter]} key={FILTERS[filter]}>
              {" "}
              {FILTERS[filter]}{" "}
            </option>
          ))}
        </select>
      </Box>
    </div>
  );
};

export default FilterTasks;
