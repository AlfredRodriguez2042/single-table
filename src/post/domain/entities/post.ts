import { Item } from "../../../utils/baseEntity";
import type { Post } from "../models/post";


export class PostEntity extends Item{
   public id: string
   public slug: string
   public title: string
   public authorId: string
   public content: string
   public createdAt: string
   public commentCount: any
   public likesCount: number
   public isPublish: boolean
    constructor(post:Partial<Post>){
        super()
        this.slug = post.slug as string
        this.title = post.title as string
        this.content = post.content as string
        this.authorId = post.authorId as string
        this.likesCount = post.likesCount ?? 0
        this.commentCount = post.commentCount ?? 0
        this.isPublish = post.isPublish ?? true
        this.id = post.id as string
        this.createdAt = post.createdAt ?? new Date().toISOString()
    }
    static fromItem(item:Post){
        return new PostEntity(item)
    }
    get pk(){
        return `POST`
    }
    get sk(){
        return `POST#id_${this.id}`
    }
    get gsi1pk(){
        return `UP#id_${this.authorId}` 
    }
    get gsi1sk(){
        return `UP#date_${this.createdAt}`
    }
    toItem(){
        return {
            ...this.keys(),
            ...this.gsi1(),
            id:this.id,
            slug:this.slug,
            title:this.title,
            content:this.content,
            authorId:this.authorId,
            isPublish: this.isPublish,
            likesCount:this.likesCount,
            commentCount: this.commentCount,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
}