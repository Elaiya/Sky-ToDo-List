import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';
import { useAppDispatch, useAppSelector } from '../src/app/hooks';
import {
  selectTasks,
  setTasks as setTasksAction,
  Task,
  TaskStatus,
} from './features/todolist/todoSlice';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectTasks);
  const setTasks = (tasks: Task[]) => {
    dispatch(setTasksAction(tasks));
  };

  const [formInput, setFormInput] = useState('');

  const handleChange = (e: any) => {
    setFormInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formInput !== '') {
      const date = new Date().toLocaleDateString();
      const newTask = {
        due_on: date,
        title: formInput,
        status: TaskStatus.PENDING,
        edit: false,
      };
      setTasks([...tasks, newTask]);
      setFormInput('');
    }
  };

  useEffect(() => {
    fetch('https://gorest.co.in/public/v1/todos')
      .then((res) => res.json())
      .then((responseList) => {
        if (tasks.length == 0) {
          setTasks(responseList.data);
        }
      });
  }, []);
  
  return (
    <div className='App'>
      <h1>TO DO list</h1>
      <Form
        formInput={formInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Todo tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
