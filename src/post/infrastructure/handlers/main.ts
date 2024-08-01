import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { PostService } from "../../application/services/post";
import DBClient from "../providers/client";

// export const handlers = {
//     findAll:async (event:APIGatewayProxyEventV2)=>{
//         return PostService(new DBClient()).findAll()
//     },
//     findOne:async (event:APIGatewayProxyEventV2)=>{
//         return PostService(new DBClient()).findOne(event.pathParameters!.id as string)
//     },
//     create:async (event:APIGatewayProxyEventV2)=>{
//         return PostService(new DBClient()).create(JSON.stringify(event.body))
//     },
// }

export const findAll = async (event: APIGatewayProxyEventV2) => {
    return PostService(new DBClient()).findAll()
}
export const findOne = async (event: APIGatewayProxyEventV2) => {
    return PostService(new DBClient()).findOne(event.pathParameters!.id as string)
}
export const userPost = async (event: APIGatewayProxyEventV2) => {
    return PostService(new DBClient()).userPost(event.pathParameters!.id as string)
}
export const create = async (event: APIGatewayProxyEventV2) => {
    return PostService(new DBClient()).create(JSON.parse(event.body!))
}
