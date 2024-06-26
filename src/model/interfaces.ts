import { BoardMemberRef, BoardRef, CheckListRef, CommentRef, DiscussionRef, PollOptionRef, PollRef, RoleRef, TagRef, TaskGroupRef, TaskRef, TeamRef, UserRef } from "./refs"

export interface Board
{
    id: string,
    createdDate: string
    title: string,
    description: string,
    visibility?: string,
    publisher: UserRef,
    maxMembers?: number,
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
    id: string,
    createdDate: string,
    text: String,
    status: String,
    user: UserRef,
    board: BoardRef,
    publisher: UserRef
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
    amountOfReceivedLikes: number
}
export interface Discussion
{
    id: string
    createdDate: string
    title: string,
    topic: string,
    text?: string,
    publisher: UserRef,
    amountOfReceivedComments: number,
    amountOfReceivedLikes: number
}
export interface Permission
{
    name: string,
    publisher: UserRef,
    role: RoleRef
}
export interface DiscussionComment
{
    id: string,
    createdDate: string,
    title: string,
    text: string,
    discussion: DiscussionRef
}
export interface PollComment
{
    id: string,
    createdDate: string
    title: string,
    text: string,
    poll: PollRef
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
    amountOfReceivedLikes: number;
}
export interface TaskURL
{
    id: string,
    createdDate: string,
    name: string,
    url: string,
    publisher: BoardMemberRef,
    task: TaskRef
}
export interface Role
{
    name: string,
    publisher: UserRef,
    board: BoardRef,
    amountOfPermissions: number
}
export interface TaskFile
{
    id: string,
    createdDate: string,
    name: string,
    type: string,
    extension: string,
}
export interface RoleOwner
{
    role: RoleRef,
    user: UserRef
}
export interface Tag
{
    id: string,
    createdDate: string,
    name: string,
    color: string,
    publisher?: UserRef,
    board?: BoardRef
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
    name?: string,
    description: string,
    priority?: string,
    publisher: UserRef,
    taskGroup?: TaskGroupRef,
    expirationDate: string,
    amountOfReceivedLikes: number,
    amountOfAssignments: number,
    amountOfImages: number,
    amountOfCheckLists: number,
    amountOfReceivedComments: number,
    amountOfURLs: number,
    amountOfFiles: number
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
export interface TaskImage
{
    id: string,
    createdDate: string,
    owner: string,
    type: string,
    uploader: UserRef;
    _links: any;
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
    option: PollOptionRef,
    user: UserRef
}
export interface TaskAssignment {
    id: string,
    createdDate: string,
    member: BoardMemberRef
    task: TaskRef
}
export interface PollOption
{
    id: string,
    createdDate: string,
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
export interface TagAssignment
{
    id: string,
    createdDate: string,
    tag: TagRef,
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
    id: string,
    createdDate: string,
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
    id: string,
    createdDate: string,
    user: UserRef,
    discussion: DiscussionRef
}
export interface PollLike 
{
    id: string,
    createdDate: string,
    user: UserRef,
    poll: PollRef
}
export interface TaskLike
{
    id: string,
    createdDate: string
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
    number: number,
    size: number,
    totalPages: number,
    totalElements: number
}
export interface TaskComment
{
    id: string,
    createdDate: string,
    task: TaskRef,
    title: string,
    text: string,
    publisher: UserRef,
    amountOfLikes: number
}
export interface DiscussionComment
{
    id: string,
    createdDate: string,
    discussion: DiscussionRef,
    title: string,
    text: string,
    publisher: UserRef,
    amountOfLikes: number
}
export interface PollComment
{
    id: string,
    createdDate: string,
    poll: PollRef,
    title: string,
    text: string
    publisher: UserRef,
    amountOfLikes: number
}