export interface CreateBoardInvite
{
    userID: string,
    boardID: string,
    text: string,
    expirationDate: string
}
export interface CreateTaskGroup
{
    boardID: string,
    name: string
}
export interface CreateTask
{
    groupID: string,
    title: string,
    name: string,
    description: string,
    priority: string
}
export interface CreateTeamMember {
    teamID: string,
    userID: string
}
export interface CreateRoleOwner
{
    name: string,
    userID: string,
    boardID: string
}
export interface CreateCheckList
{
    name: string,
    taskID: string
}
export interface CreateCheckListOption
{
    name: string,
    checkListID: string
}
export interface createTaskAssignment
{
    taskID: string,
    userID: string
}
export interface CreateTagAssignment
{
    taskID: string,
    tagID: string
}
export interface CreateTag
{
    name: string,
    color: string,
    boardID: string
}