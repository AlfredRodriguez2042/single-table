import type { APIGatewayProxyEventV2 } from "aws-lambda"
import { CommentService } from "../../application/services"
import ClientProvider from "../providers/client"
interface Event extends APIGatewayProxyEventV2 {
    queryStringParameters: {
        commentId: string
        postId: string
    }
}
export const postComments = async (event: APIGatewayProxyEventV2) => {

    return CommentService(new ClientProvider() as any).findCommentsPost(event.pathParameters!.postId as string)
}
export const findOne = async (event: Event) => {
    const keys = {...event.queryStringParameters,...event.pathParameters}
    console.log(keys)
    return CommentService(new ClientProvider()).findOne(keys)
}
export const userComments = async (event: APIGatewayProxyEventV2) => {
    return CommentService(new ClientProvider()).findCommentsUser(event.pathParameters!.id as string)
}
export const create = async (event: APIGatewayProxyEventV2) => {
    return CommentService(new ClientProvider()).create(JSON.parse(event.body!))
}
