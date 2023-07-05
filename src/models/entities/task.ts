interface Task {
    id: string
    title: string
    description: string
    status: STATUS
}

export default Task

export enum STATUS {
    ToDo = 'ToDo',
    Blocked = 'Blocked',
    InProgress = 'InProgress',
    InQA = 'InQA',
    Done = 'Done',
    Deployed = 'Deployed',
}