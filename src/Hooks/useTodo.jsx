import { FILTERS, HISTORY_ACTIONS } from "@/data/constants";
import { useState } from "react";
import useLocalstorage from "./useLocalstorage";
import useHistory from "./useHistory";

const useTodo = () => {
  const [tasks, setTasks] = useLocalstorage("TODOS", []);
  // const [tasks, setTasks] = useState(() => {  });
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [editingId, setEditingId] = useState(null);

  const { undo, redo, canRedo, canUndo, pushHistory } = useHistory(
    tasks,
    setTasks,
  );

  const startEditing = (id) => setEditingId(id);
  const stopEditing = () => setEditingId(null);

  const addTask = (task, isImportant) => {

    const newTask = {
      id: crypto.randomUUID(),
      order: tasks.length + 1,
      task,
      isImportant,
      isCompleted: false,
    };

    pushHistory({type: HISTORY_ACTIONS.ADD_TASK, targetId: newTask.id, before: null, after: {...newTask}})

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (id, newTask) => {

    const mainTask = tasks.find(task => task.id == id)

    pushHistory({type: HISTORY_ACTIONS.EDIT_TASK, targetId: id, before: {...mainTask}, after: {...mainTask, task: newTask}})


    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, task: newTask } : task,
      ),
    );



  };

  const filteredTasks = (() => {

    let result = null;

    switch (filter) {
      case FILTERS.ALL:
        result = tasks;
        break;
      case FILTERS.IMPORTANT:
        result = tasks.filter((task) => task.isImportant);
        break;
      case FILTERS.COMPLETED:
        result = tasks.filter((task) => task.isCompleted);
        break;
      case FILTERS.INCOMPLETE:
        result = tasks.filter((task) => !task.isCompleted);
        break;
      default: 
        result = tasks;
      
        
      }
      
      return [...result].sort((a, b) => a.order - b.order);
      // return result;

  })();

  const deleteTask = (id) => {
   
    pushHistory({type: HISTORY_ACTIONS.DELETE_TASK, targetId: id, before: {...tasks.find(t => t.id == id)}, after: null})
    setTasks((prevTasks) => prevTasks.filter((task) => !(task.id === id)));

  };

  const toggleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  return {
    allTasks: tasks,
    addTask,
    editTask,
    filteredTasks,
    deleteTask,
    toggleCompleted,
    setFilter,
    editingId,
    startEditing,
    stopEditing,
    undo,
    redo,
    canRedo,
    canUndo,
  };
};

export default useTodo;
