import IsImportantInput from "@/components/common/IsImportantInput";
import Btn from "@/components/ui/Btn";
import { useTasks } from "@/Hooks/useTasks";
import React, { useActionState, useEffect, useRef } from "react";

const addTaskFormAction = (previousState, formData) => {
  // validation

  const isImportant = formData.get("isImportant") ? true : false;
  const task = formData.get("task");

  return { task, isImportant };
};

const AddTask = () => {
  const [task, formAction, isPending] = useActionState(addTaskFormAction, {});
  const { addTask } = useTasks();
  const inputRef = useRef(null)

  useEffect(() => {
    if (!task.task) return;

    addTask(task.task, task.isImportant);
  }, [task]);

  useEffect( () => {

    const startAddTodoByPressKeyHandler = (e) => {

      const targetElem = e.target;
      if ( targetElem.tagName === "INPUT" ) return;

      if (e.key.length !== 1) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

     
      

      inputRef.current.focus();
      // inputRef.current.value = e.key;
      
     
    }

    window.addEventListener('keydown', startAddTodoByPressKeyHandler);

    return () => {
      window.removeEventListener('keydown', startAddTodoByPressKeyHandler);
    };
    
  } ,[])

  return (
    <form action={formAction} className="flex justify-between items-center" autoComplete="off">
      <input
      ref={inputRef}
        name="task"
        className="w-full px-2 outline-0 placeholder:text-my-dark/40 placeholder:text-sm"
        type="text"
        placeholder="add what you want to do..."
        required
      />
      <IsImportantInput />
      <Btn className={'text-[15px]'} btnType={"submit"}>Add</Btn>
    </form>
  );
};

export default AddTask;
