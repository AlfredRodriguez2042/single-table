import { UserEntity } from "../../domain/entities/user"
import type { User } from "../../domain/models/user"
import DBClient from "../providers/dynamodb"

export class UserRepository {
    private readonly client: DBClient
    constructor() {
        this.client = new DBClient()
    }
    async findAll() {
        const users = await this.client.findAll({pk:"USER"})
        return users
    }
    async findOne(options: any) {
        const model = new UserEntity(options)
        const user = await this.client.findOne(model.keys())
        return user
    }
    async create(user: User) {
        const { lastUserId = 0 } = await this.client.getLastId() as any
        const model = new UserEntity({ ...user, id: lastUserId + 1 })
        await this.client.create(model.toItem())
        await this.client.updateLastId()
        return model
    }

}