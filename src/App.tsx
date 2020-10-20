import React, { useRef, useState } from 'react';
import "./tailwind.output.css";

type formElement = React.FormEvent<HTMLFormElement>; 
interface ITasks {
  name: string;
  done: boolean
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: formElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITasks[] = [...tasks, {name, done: false}];
    setTasks(newTasks);  
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITasks[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITasks[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks); 
  };
   
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex flex flex-col">
      <div className="mx-auto">
        <form action="" onSubmit={handleSubmit} className="w-full max-w-sm mt-4">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                Task
              </label>
            </div>
            <div className="md:w-2/3">
              <input 
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="inline-full-name" 
                type="text" 
                onChange={e => setNewTask(e.target.value)} 
                value={newTask}
                autoFocus
                ref={taskInput}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                  Save
                </button>
              </div>
            </div>
        </form>
      </div>
      
      {
        tasks.map((t: ITasks, i: number) => (
          <div className="max-w-sm rounded flex flex-col mx-auto mt-3 border" key={i}>
            <h2 style={{textDecoration: t.done? 'line-through' : ''}}>{t.name}</h2>
            <div>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                onClick={ () => toggleDoneTask(i)}
              >
                {
                  t.done? '✓' : '🗙' 
                }
              </button>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" 
                onClick={() => removeTask(i)}>
                  🗑
                </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
