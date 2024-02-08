export interface BoardRef
{
    title: string,
    description: string
    minMembers: number
    maxMembers: number
    amountOfMembers: number
    amountOfGroups: number
    publisher: UserRef
}
export interface UserRef
{
    name: String,
    surname: String,
    username: String,
    gender: String
}
export interface DiscussionRef
{
    title: String,
    topic: String
}
export interface PollRef
{
    title: String,
    description: String,
    publisher: UserRef
}
export interface PollOptionRef {
    poll: PollRef,
    name: string
}
export interface RoleRef
{
    name: String,
    board: BoardRef
}
export interface TaskGroupRef
{
    name: String,
    board: BoardRef
}
export interface TaskRef
{
    id: string;
    title: string,
    description: string
    amountOfLikes: number,
    amountOfAssignedMembers: number
    publisher: UserRef,
    taskGroup: TaskGroupRef
    expirationDate: string,
    createdDate: string;
}
export interface TeamRef
{
    name: string,
    board: BoardRef
}
export interface CommentRef
{
    title: string,
    text: string,
    publisher: UserRef
}