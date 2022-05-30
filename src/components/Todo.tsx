import React, { useState } from 'react';
import Form from './Form';
import { useAppDispatch } from '../app/hooks';
import { updateTask, Task, TaskStatus } from '../features/todolist/todoSlice';

interface ToDoProps {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
}

const Todo = (props: ToDoProps) => {
  const { tasks, setTasks } = props;
  const [formInput, setFormInput] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleEdit = (index: number) => {
    //@ts-ignore
    setFormInput(tasks[index].title);
    dispatch(
      updateTask({
        index,
        key: 'edit',
        value: !tasks[index].edit,
      })
    );
  };

  const handleEditValueChange = (index: number, value: string) => {
    setFormInput(value);
    dispatch(
      updateTask({
        index,
        key: 'title',
        value,
      })
    );
  };

  const handleComplete = (index: number) => {
    const newTasks = [...tasks];
    if (newTasks[index].status === TaskStatus.PENDING) {
      dispatch(
        updateTask({
          index,
          key: 'status',
          value: TaskStatus.COMPLETED,
        })
      );
    } else {
      dispatch(
        updateTask({
          index,
          key: 'status',
          value: TaskStatus.PENDING,
        })
      );
    }
  };

  const handleRemove = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleRemoveAll = () => {
    setTasks([]);
  };

  return (
    <ul className='todo'>
      {tasks.map((task: Task, index: number) => (
        <li key={index}>
          <div className='checkAndTask'>
            <label className='checkContainer'>
              <input
                type='checkbox'
                checked={task.status === 'completed'}
                onClick={() => handleComplete(index)}
              />
              <span className='checkmark'></span>
            </label>
            {task.edit ? (
              <Form
                formInput={formInput}
                handleChange={(e: any) =>
                  handleEditValueChange(index, e.target.value)
                }
              />
            ) : (
              <span className='title-text'>{task.title}</span>
            )}
          </div>
          <div>
            <button
              style={{ color: '#3cb372' }}
              onClick={() => handleEdit(index)}
            >
              <i
                className={task.edit ? 'fa-solid fa-check' : 'fa-solid fa-pen'}
              ></i>
            </button>
            <button
              style={{ marginLeft: '15px' }}
              onClick={() => handleRemove(index)}
            >
              <i className='fa-solid fa-trash-can'></i>
            </button>
          </div>
        </li>
      ))}
      {tasks.length > 1 && (
        <p>
          <button className='deleteAll' onClick={() => handleRemoveAll()}>
            <i className='fa-solid fa-eraser'></i>Delete all
          </button>
        </p>
      )}
    </ul>
  );
};

export default Todo;
