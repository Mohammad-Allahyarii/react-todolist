import React, { useEffect } from "react";
import Btn from "../ui/Btn";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-reactjs";
import { useTasks } from "@/Hooks/useTasks";

const UndoRedo = () => {
  const { undo, redo, canUndo, canRedo } = useTasks();


  return (
    <div className="flex justify-center gap-2">
      <Btn
        className={"text-[12px] flex gap-1 items-center flex-row-reverse "}
        onClickHandler={undo}
        disabled={!canUndo}
      >
        <span>Undo</span>
        <ArrowCircleLeft className="w-4" />
      </Btn>
      <Btn
        className={"text-[12px] flex gap-1 items-center "}
        onClickHandler={redo}
        disabled={!canRedo}
      >
        <span>Redo</span>
        <ArrowCircleRight className="w-4!" />
      </Btn>
    </div>
  );
};

export default UndoRedo;
