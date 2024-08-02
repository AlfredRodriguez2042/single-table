import { NotFoundResponse, SuccessResponse } from "../../utils/responses";
import { CommentEntity } from "../domain/comment.entity";
import type { Comment } from "../domain/comment.model";
import type { IClientProvider } from "../domain/ports";

export const CommentService = (Client: IClientProvider) => ({
    findCommentsPost: async (id: string) => {
        const model = new CommentEntity({ postId: Number(id) })
        const comments = await Client.findCommemtsPost({ pk: model.pk })
        const mapper = comments.map(comment => CommentEntity.fromItem(comment))
        return SuccessResponse(mapper)
    },
    findCommentsUser: async (id: string) => {
        const model = new CommentEntity({ userId: Number(id) })
        const comments = await Client.findCommemtsUser({ keys: { gsi1pk: model.gsi1pk } })
        const mapper = comments.map(comment => CommentEntity.fromItem(comment))
        return SuccessResponse(mapper)
    },
    findOne: async (keys: { commentId: string, postId: string }) => {
        const model = new CommentEntity({ id: +keys.commentId, postId: +keys.postId })
        const comment = await Client.findOne(model.keys())
        if (!comment) {
            return NotFoundResponse('Comment not found')
        }
        return SuccessResponse(CommentEntity.fromItem(comment))

    },
    create: async (body: Comment) => {
        const { lastCommentId } = await Client.getLastId('lastCommentId')
        const comment = new CommentEntity({ ...body, id: lastCommentId + 1 })
        await Client.create(comment.toItem())
        await Client.updateLastId('lastCommentId')
        return SuccessResponse(CommentEntity.fromItem(comment))
    }
})