import { CreatedResponse, SuccessResponse } from "../../utils/responses"
import type { Like } from "../domain/comment.model"
import { CommentEntity } from "../domain/entities/comment"
import { LikeEntity } from "../domain/entities/like"
import type { IClientProvider } from "../domain/ports"

export const LikeService = (Client: IClientProvider) => ({
    create: async (body: Like) => {
        const { lastLikeId } = await Client.getLastId('lastLikeId')
        const like = { commentId: +body.commentId, userId: +body.userId, id: lastLikeId + 1, postId: +body.postId }
        const commentModel = new CommentEntity({ id: body.commentId, postId: body.postId })
        const model = new LikeEntity(like)
        await Client.createTransaction(model.toItem(), { keys: commentModel.keys(), field: "likesCount" })
        await Client.updateLastId('lastLikeId')
        return CreatedResponse(LikeEntity.fromItem(model))
    },
    delete: async (id: number) => {
        const model = new LikeEntity({ id })
        const data = await Client.delete(model.keys())
        return SuccessResponse(data)
    }
})