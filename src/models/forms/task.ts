// custom
import Task, { STATUS } from "../entities/task"

type TaskForm = Omit<Task, 'id' | 'status' | 'log'> & { status: { label: STATUS, value: STATUS } }

export default TaskForm