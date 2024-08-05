import { Item } from "../../../utils/baseEntity";
import type { Like } from "../models/post";


export class LikeEntity extends Item {
    public id: number
    public postId: number
    public userId: number
    public createdAt: string

    constructor(like: Partial<Like>) {
        super()
        this.postId = like.postId as number
        this.userId = like.userId as number
        this.id = like.id as number
        this.createdAt = like.createdAt ?? new Date().toISOString()
    }
    static fromItem(item: Like) {
        return new LikeEntity(item)
    }
    get pk() {
        return `PL#id_${this.postId}`
    }
    get sk() {
        return `LIKE#id_${this.id}`
    }
    get gsi1pk() {
        return `UL#id_${this.userId}`
    }
    get gsi1sk() {
        return `UL#date_${this.createdAt}`
    }
    toItem() {
        return {
            ...this.keys(),
            ...this.gsi1(),
            id: this.id,
            userId: this.userId,
            postId: this.postId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
}