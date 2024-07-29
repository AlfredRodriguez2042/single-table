import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
import DBClient from "../../../utils/dbclient"

export default class ClientDB extends DBClient {
    async getLastId() {
        const getCommand = new GetCommand({
            TableName: this.tableName,
            Key: { pk: "metadata", sk: "metadata" },
            AttributesToGet: ['lastUserId']
        })
        const metadata = await this.dynamodb.send(getCommand)
        return metadata.Item
    }
    async updateLastId() {
        const updateCommand = new UpdateCommand({
            TableName: this.tableName,
            Key: { pk: "metadata", sk: "metadata" },
            ConditionExpression: "attribute_exists(pk)",
            UpdateExpression: `SET lastUserId = lastUserId + :val`,
            ExpressionAttributeValues: {
                ":val": 1
            }
        })
        const metadata = await this.dynamodb.send(updateCommand)
        return metadata
    }
}