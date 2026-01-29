import useTodo from "@/Hooks/useTodo";
import React, { createContext, useContext } from "react";

export const TasksContext = createContext();

const TasksManagmentContext = ({ children }) => {
  return <TasksContext value={{ ...useTodo() }}>{children}</TasksContext>;
};




export default TasksManagmentContext;
