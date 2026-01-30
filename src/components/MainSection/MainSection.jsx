import { useTasks } from "@/Hooks/useTasks";
import React from "react";
import Todo from "./Todo";
import EmptyTasksList from "./EmptyTasksList";

const MainSection = () => {
  const { filteredTasks } = useTasks();
  

  return (
    <main className="">
      <div className="flex flex-col gap-6 mb-20">

        {filteredTasks.length > 0 ? filteredTasks.map((task) => (
          <Todo key={task.id} {...task} />
        )) : <EmptyTasksList />}


      </div>
    </main>
  );
};

export default MainSection;
