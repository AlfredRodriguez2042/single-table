import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import DBClient from "../../../utils/dbclient"
interface FindOptions {
    keys: {
        pk: string,
        sk?: string
    }
    filter?: string
    query?: string
}
export default class ClientDB extends DBClient {
    async findUserPosts(options: FindOptions) {
        const values = Object.keys(options.keys).reduce((acc, curr) => ({ ...acc, [`:${curr}`]: options.keys[curr as 'pk'] }), {})
        const queryCommand = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'GSI1',
            KeyConditionExpression: options.query,
            ExpressionAttributeValues: values,
        })
        const response = await this.dynamodb.send(queryCommand)
        return response.Items
    }
}