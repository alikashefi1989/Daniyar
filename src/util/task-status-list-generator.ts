// custom
import Task, { STATUS } from "../models/entities/task";

const taskStatusListGenerator = (currentStatus: Task['status']): Array<STATUS> => {
    if (currentStatus === STATUS.ToDo) return [STATUS.InProgress]
    if (currentStatus === STATUS.InProgress) return [STATUS.Blocked, STATUS.InQA]
    if (currentStatus === STATUS.Blocked) return [STATUS.ToDo]
    if (currentStatus === STATUS.InQA) return [STATUS.ToDo, STATUS.Done]
    if (currentStatus === STATUS.Done) return [STATUS.Deployed]
    return []
}

export default taskStatusListGenerator