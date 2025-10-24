import type { APIGatewayProxyResultV2,APIGatewayProxyStructuredResultV2 } from "aws-lambda"

const generateResponse = (statusCode: number, body: string):APIGatewayProxyStructuredResultV2 => {
    return {
        statusCode,
        headers: {
            'content-type': "application/json; charset=UTF-8"
        },
        body
    }
}
export const SuccessResponse = <T>(data: T): APIGatewayProxyStructuredResultV2 => {
    const status = 200
    const body = JSON.stringify({
        data,
        errors: null,
        status
    })
    return generateResponse(status, body)
}
export const CreatedResponse = <T>(data: T): APIGatewayProxyStructuredResultV2 => {
    const status = 201
    const body = JSON.stringify({
        data,
        errors: null,
        status
    })
    return generateResponse(status, body)
}
export const NotFoundResponse = (message: string): APIGatewayProxyStructuredResultV2 => {
    const status = 404
    const body = JSON.stringify({
        data: null,
        errors: { message: message ?? "Resource not found" },
        status
    })
    return generateResponse(status, body)
}
export const UnprocessableEntityResponse = (message: string): APIGatewayProxyResultV2 => {
    const status = 422
    const body = JSON.stringify({
        data: null,
        errors: { message: message ?? "Unprocessable entity" },
        status
    })
    return generateResponse(status, body)
}

export const InternalServerErrorResponse = (message: string): APIGatewayProxyResultV2 => {
    const status = 500
    const body = JSON.stringify({
        data: null,
        errors: { message: message ?? "Internal Server Error" },
        status
    })
    return generateResponse(status, body)
}