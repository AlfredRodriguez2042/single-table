export interface Comment {
    id: number
    userId: number
    postId: number
    content: string
    likesCount: number
    isPublish: boolean
    createdAt: string
}

export interface Like{
    id:number
    commentId:number
    postId:number
    userId:number
    createdAt:string
}