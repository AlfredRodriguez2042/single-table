import type { APIGatewayProxyEventV2, Context } from "aws-lambda"
import { logger } from "../../../utils/powertools"

interface Middleware {
    event: APIGatewayProxyEventV2
    context: Context
    response: any,
    error: any
}
interface MiddlewareResponse {
    after: (param: Middleware) => Promise<any>
    before: (param: Middleware) => Promise<any>
    onError: any
}
const AuthBefore = async ({ event, context }: Middleware) => {

}
const AuthAfter = async ({ response }: Middleware) => {
    logger.info("[Success]: " + response.statusCode)
}
const onError = async ({ error }: Middleware) => {
    logger.error("[Error] :" + error.message)
    const statusCode = 500
    return {
        statusCode,
        body: JSON.stringify({
            data: null,
            statusCode: 500,
            error: error.message
        })
    }
}
export const AuthMiddeware = (): MiddlewareResponse => ({ after: AuthAfter, before: AuthBefore, onError })