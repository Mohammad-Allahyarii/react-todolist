import { HISTORY_ACTIONS } from "@/data/constants";
import { useEffect } from "react";
import { useState } from "react";

const useHistory = (tasks, setTasks) => {
  const [previous, setPrevious] = useState([]);
  const [next, setNext] = useState([]);

  useEffect(() => {
    console.log("previous: ", previous);
    console.log("next: ", next);
  }, [previous, next]);

  const undo = () => {
    if (previous.length === 0) return null;
    const state = previous[previous.length - 1];


    setPrevious(prev => prev.slice(0, prev.length - 2));
    // next.unshift(state);
    setNext((prev) => [state, ...prev]);

    doAction(state);
  };

  const redo = () => {
    if (next.length === 0) return;
    const state = next[0];
    // previous.push(state);
    setPrevious((prev) => [...prev, state]);

    setNext((prev) => prev.slice(1));
    doAction(state, true);
  };

  const doAction = (state, isRedo = false) => {

    if (state.action === HISTORY_ACTIONS.ADD_TASK) {
      console.log(`[useHistory.jsx] - addTask, task:${state}`);

      setTasks((prevTasks) => [
        ...prevTasks,
        { ...state, action: HISTORY_ACTIONS.DELETE_TASK },
      ]);

      if (!isRedo) {
        submitAction({
          action: HISTORY_ACTIONS.DELETE_TASK,
          payload: { ...state, action: HISTORY_ACTIONS.DELETE_TASK },
        });
      }

    } else if (state.action === HISTORY_ACTIONS.DELETE_TASK) {
      console.log(`[useHistory.jsx] - deleteTask, task:${state}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== state.id));

      if (!isRedo){

        submitAction({
          action: HISTORY_ACTIONS.ADD_TASK,
          payload: { ...state, action: HISTORY_ACTIONS.ADD_TASK },
        });
      }
    } else if (state.action === HISTORY_ACTIONS.EDIT_TASK) {
      console.log(`[useHistory.jsx] - editTask, task:${state}`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === state.id ? { ...task, task: state.newTask } : task,
        ),
      );
    }
  };

  const submitAction = ({ action, payload }) => {
    if (action === HISTORY_ACTIONS.ADD_TASK) {
      setPrevious((prev) => [
        ...prev,
        { ...payload, action: HISTORY_ACTIONS.DELETE_TASK },
      ]);
    } else if (action === HISTORY_ACTIONS.DELETE_TASK) {
      setPrevious((prev) => [
        ...prev,
        { ...payload, action: HISTORY_ACTIONS.ADD_TASK },
      ]);
    } else if (action === HISTORY_ACTIONS.EDIT_TASK) {
      setPrevious((prev) => [
        ...prev,
        { ...payload, action: HISTORY_ACTIONS.EDIT_TASK },
      ]);
    }
  };

  return {
    undo,
    redo,
    submitAction,
    canRedo: next.length > 0,
    canUndo: previous.length > 0,
  };
};

export default useHistory;
