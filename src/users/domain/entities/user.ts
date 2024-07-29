import { Item } from "../../../utils/baseEntity";
import type { User } from "../models/user";

export class UserEntity extends Item{
    public username:string
    public email:string
    public password:string
    public isActive:boolean
    public followerCount:number
    public followingCount: number
    public id:number
    constructor(user:Partial<User>){
        super()
        this.email = user.email as string
        this.username = user.username as string
        this.password = user.password as string
        this.followerCount = user.followerCount ?? 0
        this.followingCount = user.followingCount ?? 0
        this.isActive = user.isActive ?? true
        this.id = user.id as number
    }
    static fromItem(item:User){
        return new UserEntity(item)
    }
    get pk(){
        return `USER`
    }
    get sk(){
        return `USER#id_${this.id}`
    }
    toItem(){
        return {
            ...this.keys(),
            username:this.username,
            email:this.email,
            isActive:this.isActive,
            followeCount:this.followerCount,
            followingCount: this.followingCount,
            id:this.id,
            password:this.password,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
}