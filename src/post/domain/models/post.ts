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
export interface Like{
    id:number
    postId:number
    userId:number
    createdAt:string
}