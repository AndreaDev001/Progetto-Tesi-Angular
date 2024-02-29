import { BoardRef, CheckListRef, CommentRef, DiscussionRef, PollOptionRef, PollRef, RoleRef, TaskGroupRef, TaskRef, TeamRef, UserRef } from "./refs"

export interface Board
{
    id: string,
    createdDate: string
    title: string,
    description: string,
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
    id: string,
    createdDate: string,
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
export interface CheckList 
{
    id: string,
    createdDate: string,
    name: string,
    amountOfOptions: number
    publisher: UserRef,
    group: TaskGroupRef
}
export interface CheckListOption
{
    id: string,
    createdDate: string,
    name: string,
    completed: boolean,
    checkList: CheckListRef,
    publisher: UserRef
}
export interface Task
{
    id: string,
    createdDate: string,
    title: string,
    subtitle: string,
    name?: string,
    description: string,
    priority?: string,
    publisher: UserRef,
    taskGroup?: TaskGroupRef,
    expirationDate: string,
    amountOfLikes: number,
    amountOfAssignedMembers: number
}
export interface TaskGroup
{
    id: string,
    createdDate: string
    name: string,
    publisher: UserRef,
    currentOrder: number,
    board: BoardRef,
    amountOfTasks: number
}
export interface Team
{
    id: string,
    createdDate: string
    name: string,
    publisher: UserRef,
    board: BoardRef
}
export interface TeamMember
{
    id: string,
    createdDate: string
    member: UserRef,
    team: TeamRef
}
export interface User
{
    id: string,
    createdDate: string,
    email?: string,
    username: string,
    name?: string,
    surname?: string,
    gender?: string,
    amountOfCreatedBoards: any,
    amountOfCreatedTasks: any,
    amountOfCreatedPolls: any,
    amountOfCreatedTags: any,
    amountOfCreatedRoles: any,
    amountOfOwnedRoles: any,
    amountOfJoinedBoards: any,
    amountOfCreatedLikes: any,
    amountOfCreatedReports: any,
    amountOfReceivedReports: any,
    amountOfCreatedBans: any,
    amountOfReceivedBans: any,
    amountOfAssignedTasks: any,
    amountOfCreatedDiscussions: any,
    amountOfCreatedVotes: any
}
export interface PollVote
{
    pollOption: PollOptionRef,
    user: UserRef
}
export interface TaskAssignment {
    id: string,
    createdDate: string,
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
export interface DiscussionLike
{
    user: UserRef,
    discussion: DiscussionRef
}
export interface PollLike 
{
    user: UserRef,
    poll: PollRef
}
export interface TaskLike
{
    user: UserRef,
    task: TaskRef
}
export interface CommentLike
{
    user: UserRef,
    comment: CommentRef
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