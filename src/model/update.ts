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
export interface UpdateBoardInvite
{
    inviteID: any,
    text?: string,
    status: string,
}
export interface UpdateCheckListOption
{
    optionID: string,
    name?: string,
    completed?: boolean
}
export interface UpdateBoard
{
    boardID: string,
    title?: string,
    description?: string,
    maxAmountOfMembers?: number,
    visibility?: string
}
export interface UpdateComment
{
    commentID: string,
    title?: string,
    text?: string
}
export interface UpdateUser
{
    name?: string,
    surname?: string,
    username?: string,
    gender?: string
}
export interface UpdateDiscussion
{
    discussionID: string
    title?: string,
    topic?: string,
    text?: string
}
export interface UpdateUserImage
{
    file: any
}
export interface UpdatePoll
{
    pollID: string,
    title?: string,
    description?: string,
    maximumVotes?: number,
    minimumVotes?: number,
}
export interface UpdatePollOption
{
    optionID: string,
    name?: string,
    description?: string
}