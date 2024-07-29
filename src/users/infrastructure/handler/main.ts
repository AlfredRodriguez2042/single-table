import type { APIGatewayProxyEventV2 } from "aws-lambda"
import middy from "@middy/core"
import { AuthMiddeware } from "../middlewares"
import { UserService } from "../../application/services"
import { UserRepository } from "../repository/user"

const handlers = {
  findAll: (event: APIGatewayProxyEventV2) => {
    return UserService(new UserRepository()).findAll()
  },
  findOne: (event: APIGatewayProxyEventV2) => {
    return UserService(new UserRepository()).findOne(event.pathParameters!.id as string)
  },
  create:async (event:APIGatewayProxyEventV2)=>{
    return UserService(new UserRepository()).create(JSON.parse(event.body!))
  }
}

export const findAll = middy().use(AuthMiddeware()).handler(handlers.findAll)
export const findOne = middy().use(AuthMiddeware()).handler(handlers.findOne)
export const create = middy().use(AuthMiddeware()).handler(handlers.create)