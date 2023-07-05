const updateEntityById = <EntityModel extends { id: string }>(
    tasks: Array<EntityModel>,
    updatedTask: EntityModel
): Array<EntityModel> => {
    if (typeof updatedTask.id !== 'string' || updatedTask.id === '' || !tasks.length) return tasks
    const indexOfTarget: number = tasks.findIndex((value: EntityModel) => value.id === updatedTask.id);
    if (indexOfTarget < 0) return tasks
    const copiedTasks: Array<EntityModel> = [...tasks]
    copiedTasks.splice(indexOfTarget, 1, updatedTask)
    return copiedTasks
}

export default updateEntityById
