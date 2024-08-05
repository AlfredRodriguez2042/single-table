import { CreatedResponse, SuccessResponse } from "../../../utils/responses"
import { LikeEntity } from "../../domain/entities/like"
import { PostEntity } from "../../domain/entities/post"
import type { Like } from "../../domain/models/post"

export const LikeService = (Client: any) => ({
    create: async (body: Like) => {
        const { lastLikeId } = await Client.getLastId('lastLikeId')
        const like = { postId: +body.postId, userId: +body.userId, id: lastLikeId + 1 }
        const postModel = new PostEntity({ id: String(body.postId) })
        const model = new LikeEntity(like)
        await Client.createTransaction(model.toItem(), { keys: postModel.keys(), field: "likesCount" })
        await Client.updateLastId('lastLikeId')
        return CreatedResponse(LikeEntity.fromItem(model))
    },
    delete: async (id: number) => {
        const model = new LikeEntity({ id })
        const data = await Client.delete(model.keys())
        return SuccessResponse(data)
    }
})