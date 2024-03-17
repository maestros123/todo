import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import {loadState, saveState} from "../localStorage";

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState({
        tasks: store.getState().tasks
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;