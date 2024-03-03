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
    name: string,
    surname: string,
    username: string,
    gender: string
}
export interface TagRef
{
    id: string,
    createdDate: string,
    name: string,
    color: string
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
    id: string,
    createdDate: string
    poll: PollRef,
    name: string
}
export interface RoleRef
{
    id: string,
    createdDate: string
    name: String,
    board: BoardRef
}
export interface TaskGroupRef
{
    id: string,
    createdDate: string
    name: String,
    board: BoardRef
}
export interface TaskRef
{
    id: string;
    createdDate: string;
    title: string,
    subtitle: string,
    description: string
    amountOfLikes: number,
    amountOfAssignedMembers: number
    publisher: UserRef,
    taskGroup: TaskGroupRef
    expirationDate: string,
}
export interface CheckListRef
{
    id: string,
    createdDate: string,
    name: string,
    publisher: UserRef
    group: TaskGroupRef
}
export interface TeamRef
{
    id: string,
    createdDate: string
    name: string,
    board: BoardRef
}
export interface CommentRef
{
    id: string,
    createdDate: string
    title: string,
    text: string,
    publisher: UserRef
}