export interface BoardRef
{
    title: string
    minMembers: number,
    maxMembers: number 
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
    title: string,
    name: string,
    publisher: UserRef,
    taskGroup: TaskGroupRef
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