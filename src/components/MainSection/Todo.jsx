import React, { useEffect, useState } from "react";
import Box from "../ui/Box";
import Btn from "../ui/Btn";
import { useTasks } from "@/Hooks/useTasks";
import { MinusSquare, TickSquare } from "iconsax-reactjs";

const Todo = ({ id, task, isImportant, isCompleted }) => {
  const {
    editTask,
    editingId,
    startEditing,
    stopEditing,
    deleteTask,
    toggleCompleted,
  } = useTasks();

  const [editVal, setEditVal] = useState(task);
  const isEditing = editingId === id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {

    if (!deleted) return;

      const timer = setTimeout(() => {
        deleteTask(id);
      }, 300);


    () => clearTimeout(timer);

  }, [deleted]);

  const editTaskHandler = () => {
    if (isEditing && editVal) {
      editTask(id, editVal);
      stopEditing();
      return;
    } else if (!isEditing){
      startEditing(id);
      return;
    } 

    alert('task can\'t be empty')
    
  };

  const deleteTaskHandler = () => {
    setDeleted(true);
  };

  return (
    <Box
      className={`
        ${
          isCompleted && "border-primary/80 hover:border-primary"
        }

        ${
        isEditing &&
        "shadow-[0_0_50px_5px] shadow-green-600/10! border-green-600!"
      } 
      ${deleted && "opacity-0 transition-all duration-300"}

      ${
        isDeleting &&
        "overflow-hidden shadow-[0_0_20px_10px] shadow-red-600/20! border-red-600! "
      }
      
        `}
    >
      <div className="flex justify-between items-center">
        {isEditing && (
          <input
            autoFocus
            onBlur={stopEditing}
            className="outline-0 border-b-green-600 border-b w-[30%] "
            type="text"
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            onKeyUp={(event) => event.key === 'Enter' ? editTaskHandler() : null}
          />
        )}
        {!isEditing && (
          <div className="flex items-center gap-2 ">
            <button
              className="cursor-pointer"
              onClick={() => toggleCompleted(id)}
            >
              {isCompleted ? (
                <TickSquare className="text-primary" size="24" />
              ) : (
                <MinusSquare size="24" className="text-my-dark" />
              )}
            </button>
            <h3 className={isCompleted ? "line-through opacity-50" : null}>
              {task}
            </h3>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Btn
            onMouseDownHandler={(e) => {
              e.preventDefault();
              editTaskHandler();
            }}
            className={`bg-green-600! shadow-green-400/30! text-[12px] sm:text-sm ${isCompleted ? "opacity-60" : ""}`}
          >
            {isEditing ? "Done" : "Edit"}
          </Btn>
          <Btn
            onClickHandler={() => setIsDeleting(true)}
            className={`bg-red-600! shadow-red-600/30! text-[12px] sm:text-sm ${isCompleted ? "opacity-60" : ""}`}
          >
            Delete
          </Btn>
        </div>
      </div>

      {/* delete confirmation */}
      <div
        className={`w-full h-full fixed inset-0 opacity-0 invisible text-center flex justify-center items-center bg-red-600  ${
          isDeleting && " opacity-100 visible"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-white!">Are You Sure?</span>
          <div className="flex items-center gap-2">
            <Btn
              onClickHandler={() => deleteTaskHandler()}
              className={"bg-red-200! text-black! shadow-none! text-sm"}
            >
              Yes
            </Btn>
            <Btn
              onClickHandler={() => setIsDeleting(false)}
              className={"bg-red-200! text-black! shadow-none! text-sm"}
            >
              No
            </Btn>
          </div>
        </div>
      </div>

      {isImportant && !isDeleting && !isEditing && (
        <span className="fixed left-[50%] bottom-[-16px] rounded-[7px] text-yellow-400 text-sm  bg-my-light py-1 px-2 translate-x-[-50%] ">
          important
        </span>
      )}
    </Box>
  );
};

export default Todo;
