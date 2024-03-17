import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface TasksState {
    tasks: Task[];
    filter: 'all' | 'completed' | 'uncompleted';
}

const initialState: TasksState = {
    tasks: [],
    filter: 'all',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: {
            reducer: (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            },
            prepare: (text: string) => ({
                payload: {
                    id: nanoid(),
                    text,
                    completed: false,
                },
            }),
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        editTask: (state, action: PayloadAction<{ id: string; newText: string }>) => {
            const { id, newText } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.text = newText;
            }
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTasksOrder: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
            const { startIndex, endIndex } = action.payload;
            const [removed] = state.tasks.splice(startIndex, 1);
            state.tasks.splice(endIndex, 0, removed);
        },
        setFilter: (state, action: PayloadAction<'all' | 'completed' | 'uncompleted'>) => {
            state.filter = action.payload;
        },
    },
});

export const { addTask, editTask, toggleTask, deleteTask,updateTasksOrder, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
