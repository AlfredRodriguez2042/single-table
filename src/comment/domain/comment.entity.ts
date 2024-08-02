import { Item } from "../../utils/baseEntity";
import type { Comment } from "./comment.model";


export class CommentEntity extends Item{
   public id: number
   public postId: number
   public userId: number
   public content: string
   public createdAt: string
   public likesCount: number
   public isPublish: boolean
    constructor(comment:Partial<Comment>){
        super()
        this.postId = comment.postId as number
        this.userId = comment.userId as number
        this.content = comment.content as string
        this.likesCount = comment.likesCount ?? 0
        this.isPublish = comment.isPublish ?? true
        this.id = comment.id as number
        this.createdAt = comment.createdAt ?? new Date().toISOString()
    }
    static fromItem(item:Comment){
        return new CommentEntity(item)
    }
    get pk(){
        return `COMMENT#id_${this.postId}`
    }
    get sk(){
        return `COMMENT#id_${this.id}`
    }
    get gsi1pk(){
        return `UC#id_${this.userId}` 
    }
    get gsi1sk(){
        return `UC#date_${this.createdAt}`
    }
    toItem(){
        return {
            ...this.keys(),
            ...this.gsi1(),
            id:this.id,
            userId:this.userId,
            postId:this.postId,
            content:this.content,
            isPublish: this.isPublish,
            likesCount:this.likesCount,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
}