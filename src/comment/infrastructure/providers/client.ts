import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import DBClient from "../../../utils/dbclient"
export interface FindOptions {
    keys: {
        gsi1pk: string
        gsi1sk?: string
    }
    query?: string
}
export default class ClientProvider extends DBClient {
    async findCommemtsUser(options: FindOptions): Promise<any> {
        const values = Object.keys(options.keys).reduce((acc, curr) => ({ ...acc, [`:${curr}`]: options.keys[curr as 'gsi1pk'] }), {})
        const query = options.keys.gsi1sk ? "pk = :pk and begins_with(sk,:sk)" : "gsi1pk = :gsi1pk"
        const queryCommand = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'GSI1',
            KeyConditionExpression: options.query || query,
            ExpressionAttributeValues: values,
        })
        const response = await this.dynamodb.send(queryCommand)
        return response.Items
    }
    async findCommemtsPost(keys: { pk: string }): Promise<any> {
        return this.findAll(keys)
    }
}