import { FILTERS, HISTORY_ACTIONS } from "@/data/constants";
import { useState } from "react";
import useLocalstorage from "./useLocalstorage";
import useHistory from "./useHistory";

const useTodo = () => {
  const [tasks, setTasks] = useLocalstorage("TODOS", []);
  // const [tasks, setTasks] = useState(() => {  });
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [editingId, setEditingId] = useState(null);

  const { undo, redo, canRedo, canUndo, submitAction } = useHistory(
    tasks,
    setTasks,
  );

  const startEditing = (id) => setEditingId(id);
  const stopEditing = () => setEditingId(null);

  const addTask = (task, isImportant) => {
    const newTask = {
      id: crypto.randomUUID(),
      task,
      isImportant,
      isCompleted: false,
    };

    submitAction({ action: HISTORY_ACTIONS.ADD_TASK, payload: newTask });

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (id, newTask) => {
    submitAction({
      action: HISTORY_ACTIONS.EDIT_TASK,
      payload: {
        id,
        previousTask: tasks.find((task) => task.id === id).task,
        newTask,
      },
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, task: newTask } : task,
      ),
    );
  };

  const filteredTasks = (() => {
    switch (filter) {
      case FILTERS.ALL:
        return tasks;
      case FILTERS.IMPORTANT:
        return tasks.filter((task) => task.isImportant);
      case FILTERS.COMPLETED:
        return tasks.filter((task) => task.isCompleted);
      case FILTERS.INCOMPLETE:
        return tasks.filter((task) => !task.isCompleted);
    }
  })();

  const deleteTask = (id) => {
    submitAction({
      action: HISTORY_ACTIONS.DELETE_TASK,
      payload: tasks.find((task) => task.id === id),
    });
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
