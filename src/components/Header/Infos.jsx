import { MinusSquare, Star, TaskSquare, TickSquare } from "iconsax-reactjs";
import React, { Fragment } from "react";
import InfoCard from "./InfoCard";
import { useTasks } from "@/Hooks/useTasks";

const Infos = () => {
  const { allTasks } = useTasks();

  const importantsCount = allTasks.reduce((prev, curr) => {
    return curr.isImportant ? prev + 1 : prev;
  }, 0);

  const completedsCount = allTasks.reduce((prev, curr) => {
    return curr.isCompleted ? prev + 1 : prev;
  }, 0);
  const inCompeletedsCount = allTasks.reduce((prev, curr) => {
    return !curr.isCompleted ? prev + 1 : prev;
  }, 0);

  const infosName = [
    {
      name: "All Tasks",
      Icon: TaskSquare,
      color: "#44d461",
      count: allTasks.length,
    },
    {
      name: "Importants",
      Icon: Star,
      color: "#cfbe00",
      count: importantsCount,
    },
    {
      name: "Completeds",
      Icon: TickSquare,
      color: "#00c3ff",
      count: completedsCount,
    },
    {
      name: "In Completeds",
      Icon: MinusSquare,
      color: "#ff009d",
      count: inCompeletedsCount,
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-4 mt-4">
      {infosName.map((info) => (
        <InfoCard key={info.name} {...info} />
      ))}
    </div>
  );
};

export default Infos;
