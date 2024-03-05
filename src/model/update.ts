export interface UpdateTask
{
    taskID: string,
    title?: string,
    name?: string,
    description?: string,
    order?: number,
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
export interface UpdateCheckList
{
    checkListID: string
    name?: string
}
export interface UpdateCheckListOption
{
    optionID: string,
    name?: string,
    completed?: boolean
}