import { BoardRef, CommentRef, DiscussionRef, PollOptionRef, PollRef, RoleRef, TaskGroupRef, TaskRef, TeamRef, UserRef } from "./refs"

export interface Board
{
    id: string,
    createdDate: string
    title: string,
    description: string,
    minMembers: number,
    maxMembers: number,
    visibility?: string,
    publisher: UserRef
    amountOfGroups?: number,
    amountOfRoles?: number,
    amountOfTags?: number,
    amountOfMembers?: number
}
export interface Ban
{
    id: string,
    createdDate: string,
    title: string,
    description: string,
    expirationDate: string,
    expired: boolean,
    banner: UserRef,
    banned: UserRef,
    reason: string,
    type: string
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
    board: BoardRef
}
export interface Comment
{
    id: string,
    createdDate: string,
    title: string,
    text: string,
    publisher: UserRef,
    discussion: DiscussionRef,
    amountOfLikes: number
}
export interface Discussion
{
    id: string
    createdDate: string
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
    id: string,
    createdDate: string,
    publisher: UserRef
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
    name?: string,
    description: string,
    priority?: string,
    publisher: UserRef,
    taskGroup?: TaskGroupRef,
    expirationDate: string,
    createdDate: string,
    amountOfLikes: number,
    amountOfAssignedMembers: number
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
    id: string,
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
    amountOfReceivedBans: number,
    amountOfAssignedTasks: number,
    amountOfCreatedDiscussions: number,
    amountOfCreatedVotes: number
}
export interface PollVote
{
    pollOption: PollOptionRef,
    user: UserRef
}
export interface TaskAssignment {
    user: UserRef,
    task: TaskRef
}
export interface PollOption
{
    poll: PollRef,
    name: string,
    description: string,
    amountOfVotes: number
}

export interface Report
{
    id: string,
    createdDate: string
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

export interface PaginationRequest {
    page: number,
    pageSize: number
}
export interface PagedModel
{
    _embedded: EmbeddedPagedModel
    page?: Page
}
export interface CollectionModel
{
    _embedded:  EmbeddedCollectionModel
}
export interface EmbeddedCollectionModel
{
    content: any[]
}
export interface EmbeddedPagedModel
{
    content: any[],
}
export interface Page
{
    page: number,
    size: number,
    totalPages: number,
    totalElements: number
}