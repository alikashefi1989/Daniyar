const addNewEntity = <EntityModel extends { id: string }>(
    tasks: Array<EntityModel>,
    newTask: EntityModel
): Array<EntityModel> => {
    const copiedTasks: Array<EntityModel> = [...tasks]
    if (!copiedTasks.length) {
        copiedTasks.push(newTask)
    } else {
        copiedTasks.unshift(newTask)
    }
    return copiedTasks
}

export default addNewEntity
