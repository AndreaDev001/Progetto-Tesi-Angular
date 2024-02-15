export interface BoardRef
{
    id: string,
    createdDate: string
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
    id: string,
    createdDate: string
    name: String,
    surname: String,
    username: String,
    gender: String
}
export interface DiscussionRef
{
    id: string,
    createdDate: string
    title: string,
    topic: string,
    publisher: UserRef,
    amountOfComments: number,
    amountOfLikes: number
}
export interface PollRef
{
    id: string,
    createdDate: string
    title: string
    description: string
    minimumVotes: number
    maximumVotes: number
    amountOfLikes: number
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
    subtitle: string,
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