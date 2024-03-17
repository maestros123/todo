

interface RootState {
    tasks: TaskState;
}
interface TaskState {
    tasks: Task[];
    filter: 'all' | 'completed' | 'uncompleted';
}
interface Task {
    id: string;
    text: string;
    completed: boolean;
}
export const loadState = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        // Уточняем, что парсинг может вернуть любой тип, но мы ожидаем получить RootState
        return JSON.parse(serializedState) as RootState;
    } catch (err) {
        console.error("Could not load state: ", err);
        return undefined;
    }
};

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Could not save state: ", err);
        // Обработка ошибок при сохранении состояния, например, логирование
    }
};