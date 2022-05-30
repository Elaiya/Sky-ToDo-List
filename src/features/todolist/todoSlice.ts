import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Task {
  due_on: string;
  title: String;
  status: 'pending' | 'completed';
  edit: Boolean;
}

export interface TodoState {
  tasks: Task[];
}

export enum TaskStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

const initialState: TodoState = {
  tasks: sessionStorage.getItem('tasks')
    //@ts-ignore
    ? JSON.parse(sessionStorage.getItem('tasks')).map((value) => ({
        ...value,
        edit: false,
      }))
    : [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      sessionStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const { index, key, value } = action.payload;
      //@ts-ignore
      state.tasks[index][key] = value;
      sessionStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { setTasks, updateTask } = todoSlice.actions;
export const selectTasks = (state: RootState) => state.todo.tasks;
export default todoSlice.reducer;
