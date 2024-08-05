import { Item } from "../../../utils/baseEntity"
import type { Like } from "../comment.model"

export class LikeEntity extends Item {
    public id: number
    public commentId: number
    public postId: number
    public userId: number
    public createdAt: string

    constructor(like: Partial<Like>) {
        super()
        this.commentId = like.commentId as number
        this.postId = like.postId as number
        this.userId = like.userId as number
        this.id = like.id as number
        this.createdAt = like.createdAt ?? new Date().toISOString()
    }
    static fromItem(item: Like) {
        return new LikeEntity(item)
    }
    get pk() {
        return `CL#id_${this.commentId}`
    }
    get sk() {
        return `LIKE#id_${this.id}`
    }
    get gsi1pk() {
        return `UCL#id_${this.userId}`
    }
    get gsi1sk() {
        return `UCL#date_${this.createdAt}`
    }
    toItem() {
        return {
            ...this.keys(),
            ...this.gsi1(),
            id: this.id,
            userId: this.userId,
            postId: this.postId,
            commentId: this.commentId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
}