import { HISTORY_ACTIONS } from "@/data/constants";
import { useEffect, useState } from "react";

const useHistory = (tasks, setTasks) => {

  const [previous, setPrevious] = useState([]);
  const [next, setNext] = useState([]);

  useEffect(() => {
    console.log("previous", previous);
    console.log("next", next);
  }, [previous, next]);

  const undo = () => {

    const toDoHistoryTask = previous[previous.length - 1];

    if (toDoHistoryTask.actionToPrev === HISTORY_ACTIONS.ADD_TASK) {
      setTasks((prev) => [...prev, toDoHistoryTask]);
      toDoHistoryTask.actionToNext = HISTORY_ACTIONS.DELETE_TASK;
    } else if (toDoHistoryTask.actionToPrev === HISTORY_ACTIONS.DELETE_TASK) {
      setTasks((prev) => prev.filter((task) => task.id != toDoHistoryTask.id));
      toDoHistoryTask.actionToNext = HISTORY_ACTIONS.ADD_TASK;

    } else if (toDoHistoryTask.actionToPrev === HISTORY_ACTIONS.EDIT_TASK) {

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === toDoHistoryTask.id ? { ...task, task: toDoHistoryTask.prevTitle, actionToNext: HISTORY_ACTIONS.EDIT_TASK } : task,
        ),
      );

    }

    setPrevious((prev) => prev.slice(0, prev.length - 1));
    setNext((prev) => [toDoHistoryTask, ...prev]);

  };

  const redo = () => {

    const toDoHistoryTask = next[0];

    setPrevious((prev) => [...prev, toDoHistoryTask]);
    setNext((prev) => prev.slice(1));

    if (toDoHistoryTask.actionToNext === HISTORY_ACTIONS.ADD_TASK) {
      setTasks((prev) => [...prev, {...toDoHistoryTask}]);
    } else if (toDoHistoryTask.actionToNext === HISTORY_ACTIONS.DELETE_TASK) {

      setTasks((prev) => prev.filter((task) => task.id != toDoHistoryTask.id));

    } else if (toDoHistoryTask.actionToNext === HISTORY_ACTIONS.EDIT_TASK) {

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === toDoHistoryTask.id ? { ...task, task: toDoHistoryTask.nextTitle, actionToPrev: HISTORY_ACTIONS.EDIT_TASK } : task,
        ),
      );

    }
  };

  const addToPreviousHandler = ({ action, task, payload = null }) => {

    if (action === HISTORY_ACTIONS.ADD_TASK) {
      setPrevious((prev) => [
        ...prev,
        { ...task, actionToPrev: HISTORY_ACTIONS.DELETE_TASK },
      ]);
    } else if (action === HISTORY_ACTIONS.DELETE_TASK) {
      setPrevious((prev) => [
        ...prev,
        { ...task, actionToPrev: HISTORY_ACTIONS.ADD_TASK },
      ]);
    } else if (action === HISTORY_ACTIONS.EDIT_TASK) {
      
      setPrevious((prev) => [
        ...prev,
        {
          ...task,
          actionToPrev: HISTORY_ACTIONS.EDIT_TASK,
          nextTitle: payload.newTitle,
          prevTitle: task.task,
        },
      ]);
    }

    setNext([]);
  };

  return {
    undo,
    redo,
    addToPreviousHandler,
    canRedo: next.length > 0,
    canUndo: previous.length > 0,
  };
};

export default useHistory;
