export interface UpdateTask
{
    taskID: string,
    title?: string,
    name?: string,
    description?: string,
    priority?: string,
    expirationDate?: string,
    groupID?: string
}
export interface UpdateTaskGroup
{
    groupID: string,
    name?: string,
    expirationDate?: string,
    order?: number
}