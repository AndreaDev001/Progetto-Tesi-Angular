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
export interface CreateComment
{
    title: string,
    text: string,
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
export interface CreateTaskImage
{
    taskID: string,
    files: any[]
}
export interface CreateBoardImage
{
    boardID: string,
    file: any
}
export interface CreateTaskURL
{
    taskID: string,
    url: string,
    name: string
}
export interface CreateTaskFile
{
    name: string,
    taskID: string,
    multipartFile: any
}