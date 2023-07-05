// custom
import Task from "./entities/task";

export interface DataOfStore {
    darkMode: boolean;
    tasks: Array<Task>
};

export interface ActionOfStore {
    setDarkMode?: any;
    setTasks?: any;
};

export type Store = DataOfStore & ActionOfStore;