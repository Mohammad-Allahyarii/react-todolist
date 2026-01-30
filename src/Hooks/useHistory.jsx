import { HISTORY_ACTIONS } from "@/data/constants";
import { useEffect, useState } from "react";

const useHistory = (tasks, setTasks) => {
  const [previous, setPrevious] = useState([]);
  const [next, setNext] = useState([]);




  const applyChange = (entry, mode) => {
    
    const data = mode === 'undo' ? entry.before : entry.after;

    // ADD
    if ( entry.before === null && entry.after ) {
      
      if (mode === 'redo') {
        setTasks(prev => [...prev, data])
      } else {
        setTasks(prev => prev.filter(task => task.id != entry.targetId))
      }

      return;

    }

    // DELETE
    if ( entry.after === null && entry.before ) {

      if (mode === 'redo') {
        setTasks(prev => prev.filter(task => task.id != entry.targetId));
      } else {
        setTasks(prev => [...prev, data])
      }

      return;
    }

    // EDIT
   setTasks(prev => prev.map(task => (

    task.id === entry.targetId 
    ? { ...task, ...data }
    : task
   )));

  }

  const undo = () => {
    if (previous.length === 0) return;

    const entry = previous[previous.length - 1];
    applyChange(entry, 'undo');
    setPrevious(prev => prev.slice(0, -1));
    setNext(prev => [entry, ...prev ]);


  };

  const redo = () => {

    if (next.length === 0) return;

    const entry = next[0];

    applyChange(entry, 'redo')
    setNext(prev => prev.slice(1))
    setPrevious(prev => [...prev, entry])

  };

  const pushHistory = ({type, targetId, before, after}) => {

    setPrevious(prev => [
      ...prev,
      { type, targetId, before, after }
    ])

    setNext([])


  }

  return {
    undo,
    redo,
    pushHistory,
    canRedo: next.length > 0,
    canUndo: previous.length > 0,
  };
};

export default useHistory;
