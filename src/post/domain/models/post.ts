export interface Post {
    id: string
    slug: string
    title: string
    authorId: string
    content: string
    commentCount: any
    likesCount: number
    isPublish:boolean,
    createdAt:string
}