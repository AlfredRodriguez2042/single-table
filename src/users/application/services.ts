import { CreatedResponse, NotFoundResponse, SuccessResponse } from "../../utils/responses"
import { UserEntity } from "../domain/entities/user"
import type { User } from "../domain/models/user"
import type { IRepository } from "../domain/ports/user"

export const UserService = (repository: IRepository) => ({
    findAll: async () => {
        const users = await repository.findAll()
        return SuccessResponse(users.map((user:UserEntity)=>UserEntity.fromItem(user)))
    },
    findOne: async (id: string) => {
        const user = await repository.findOne({id})
        if (!user) {
            return NotFoundResponse("User not found")
        }
        return SuccessResponse(UserEntity.fromItem(user))
    },
    create: async (user:Partial<User>) => { 
       const result = await repository.create(user)
        return CreatedResponse(UserEntity.fromItem(result))
    },
    update: async () => { },
})