import { NotFoundResponse, SuccessResponse } from "../../../utils/responses"
import { PostEntity } from "../../domain/entities/post"
import type { Post } from "../../domain/models/post"

export const PostService = (client: any) => ({
    findAll: async () => {
        const posts = await client.findAll({ pk: "POST" })
        return SuccessResponse(posts.map((post: PostEntity) => PostEntity.fromItem(post)))
    },
    findOne: async (id: string) => {
        const model = new PostEntity({ id })
        const post = await client.findOne(model.keys())
        if (!post) {
            return NotFoundResponse('Post not found')
        }
        const userKeys = {
            pk: "USER",
            sk: `USER#id_${post.authorId}`
        }
        const author = await client.findOne(userKeys, { select: ['id', 'email'] })
        const result ={ ...PostEntity.fromItem(post),author}
        return SuccessResponse(result)
    },
    userPost: async (userId: string) => {
        const posts = await client.findUserPosts({ keys: { pk: `UP#id_${userId}` }, query: 'gsi1pk = :pk' })
        return SuccessResponse(posts)
    },
    create: async (body: Omit<Post, 'id'>) => {
        const { lastPostId } = await client.getLastId('lastPostId')
        const model = new PostEntity({ ...body, id: lastPostId + 1 })
        await client.create(model.toItem())
        await client.updateLastId('lastPostId')
        return SuccessResponse(PostEntity.fromItem(model as any))
    }
})