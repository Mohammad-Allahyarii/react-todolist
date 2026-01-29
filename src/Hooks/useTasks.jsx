import { TasksContext } from "@/context/TasksManagmentContext";
import { useContext } from "react";



export const useTasks = () => {
    const context = useContext(TasksContext);


    if (!context) throw Error('useTasks must be used within a TasksProvidor');

    return context;
}