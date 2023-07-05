const getEntityById = <EntityModel extends { id: string }>(
    tasks: Array<EntityModel>,
    id: string
): EntityModel | undefined => {
    if (typeof id !== 'string' || id === '' || !tasks.length) return undefined
    const indexOfTarget: number = tasks.findIndex((value: EntityModel) => value.id === id);
    if (indexOfTarget < 0) return undefined
    const targetValue: EntityModel = tasks[indexOfTarget]
    return targetValue
}

export default getEntityById
