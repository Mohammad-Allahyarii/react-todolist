
export  const generateTask = () => {
  const tasks = [];
  let task;
  for (let i = 0; i <= 5; i++) {

    task = {
      id: crypto.randomUUID(),
      task: `task-${i}`,
      isImportant: Math.random() > 0.5,
      isCompleted: false,
    };

    tasks.push(task)
  }


  localStorage.setItem('TODOS', JSON.stringify(tasks))

};
