import type { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2, APIGatewayProxyResult, Context } from "aws-lambda"
import DBClient from "../providers/dynamodb"

export const findOne: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResult> => {
    console.log("paso", process.env.CLIENT_SECRET)
    console.log("paso", process.env.TOTAL)
 const res= await   new DBClient().findAll()
 console.log(res)
    return {
        statusCode: 200,
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify("hola")
    }
}