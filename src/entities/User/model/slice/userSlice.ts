import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
  tasks: [{ date: '', active: [], done: [] }],
  selectedDay: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    renderActiveTasks: (state, action: PayloadAction<string[]>) => {
      const foundTasksByDate = state.tasks.find((task) => task.date === state.selectedDay);
      if (!foundTasksByDate) {
        state.tasks.push({ date: state.selectedDay, active: action.payload, done: [] });
      } else {
        foundTasksByDate.active.push(...action.payload);
      }
    },
    addActiveTask: (state, action: PayloadAction<string>) => {
      const task = action.payload;
      const foundTasksByDate = state.tasks.find((task) => task.date === state.selectedDay);
      if (!foundTasksByDate) {
        state.tasks.push({ date: state.selectedDay, active: [task], done: [] });
      } else {
        foundTasksByDate.active.push(task);
      }
    },
    markTaskAsDone: (state, action: PayloadAction<number>) => {
      const foundTasksByDate = state.tasks.find((task) => task.date === state.selectedDay);
      const foundActiveTaskByIndex = foundTasksByDate.active.find(
        (_, index) => index === action.payload
      );
      if (!foundTasksByDate) {
        state.tasks.push({ date: state.selectedDay, done: [foundActiveTaskByIndex] });
      } else {
        foundTasksByDate.done.push(foundActiveTaskByIndex);
      }
    },
    markTaskAsActive: (state, action: PayloadAction<number>) => {
      const foundTasksByDate = state.tasks.find((task) => task.date === state.selectedDay);
      const foundActiveTaskByIndex = foundTasksByDate.done.find(
        (_, index) => index === action.payload
      );
      if (!foundTasksByDate) {
        state.tasks.push({ date: state.selectedDay, active: [foundActiveTaskByIndex] });
      } else {
        foundTasksByDate.active.push(foundActiveTaskByIndex);
      }
    },
    deleteActiveTask: (state, action: PayloadAction<number>) => {
      const foundTasksByDate = state.tasks.find((task) => task.date === state.selectedDay);
      foundTasksByDate.active = foundTasksByDate.active.filter(
        (_, index) => index !== action.payload
      );
    },
    deleteDoneTask: (state, action: PayloadAction<number>) => {
      const task = action.payload;
      const foundTasksByDate = state.tasks.find((task) => task.date === state.selectedDay);
      foundTasksByDate.done = foundTasksByDate.done.filter((_, index) => index !== task);
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
