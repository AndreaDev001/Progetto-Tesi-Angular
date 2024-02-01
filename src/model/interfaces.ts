import { BoardRef, CommentRef, DiscussionRef, PollRef, RoleRef, TaskGroupRef, TaskRef, TeamRef, UserRef } from "./refs"

export interface Board
{
    title: string,
    description: string,
    minMembers: number,
    maxMembers: number,
    visibility: string,
    amountOfGroups: number,
    amountOfRoles: number,
    amountOfTags: number,
    amountOfMembers: number
}
export interface BoardInvite
{
    text: String,
    status: String,
    user: UserRef,
    board: BoardRef
}
export interface BoardMember
{
    user: UserRef,
    boad: BoardRef
}
export interface Comment
{
    title: string,
    text: string,
    publisher: UserRef,
    discussion: DiscussionRef,
    amountOfLikes: number
}
export interface Discussion
{
    title: string,
    topic: string,
    publisher: UserRef,
    amountOfComments: number,
    amountOfLikes: number
}
export interface Permission
{
    name: string,
    publisher: UserRef,
    role: RoleRef
}
export interface Poll
{
    title: string,
    description: string,
    minimumVotes: number,
    maximumVotes: number,
    amountOfLikes: number
}
export interface Role
{
    name: string,
    publisher: UserRef,
    board: BoardRef,
    amountOfPermissions: number
}
export interface RoleOwner
{
    role: RoleRef,
    user: UserRef
}
export interface Tag
{
    name: string,
    publisher: UserRef,
    board: BoardRef
}
export interface Task
{
    title: string,
    name: string,
    description: string,
    priority: string,
    publisher: UserRef,
    taskGroup: TaskGroupRef,
    amountOfLikes: number
}
export interface TaskGroup
{
    name: string,
    publisher: UserRef,
    board: BoardRef,
    amountOfTasks: number
}
export interface Team
{
    name: string,
    publisher: UserRef,
    board: BoardRef
}
export interface TeamMember
{
    member: UserRef,
    team: TeamRef
}
export interface User
{
    email: string,
    username: string,
    name: string,
    surname: string,
    gender: string,
    amountOfCreatedBoards: number,
    amountOfCreatedTasks: number,
    amountOfCreatedPolls: number,
    amountOfCreatedTags: number,
    amountOfCreatedRoles: number,
    amountOfOwnedRoles: number,
    amountOfJoinedBoards: number,
    amountOfCreatedLikes: number,
    amountOfCreatedReports: number,
    amountOfReceivedReports: number,
    amountOfCreatedBans: number,
    amountOfReceivedBans: number
}
export interface Report
{
    title: string,
    description: string,
    reason: string,
    type: string,
    reporter: UserRef,
    reported: UserRef
}
export interface TaskReport
{
    title: string,
    description: string,
    reason: string,
    type: string,
    reporter: UserRef,
    reported: UserRef,
    task: TaskRef
}
export interface DiscussionReport
{
    title: string,
    description: string,
    reason: string,
    type: string,
    reporter: UserRef,
    reported: UserRef,
    discussion: DiscussionRef
}
export interface PollReport
{
    title: string,
    description: string,
    reason: string,
    type: string,
    reporter: UserRef,
    reported: UserRef,
    poll: PollRef
}
export interface CommentReport
{
    title: string,
    description: string,
    reason: string,
    type: string,
    reporter: UserRef,
    reported: UserRef,
    comment: CommentRef
}