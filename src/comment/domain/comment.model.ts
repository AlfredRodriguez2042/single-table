export interface Comment {
    id: number
    userId: number
    postId: number
    content: string
    likesCount: number
    isPublish: boolean
    createdAt: string
}