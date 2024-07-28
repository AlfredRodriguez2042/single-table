import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { QueryCommand } from "@aws-sdk/lib-dynamodb"

const config = { endpoint: "http://localhost:8000", region: "us-east-1", credentials: { secretAccessKey: "sasa", accessKeyId: "red" } }
export default class DBClient {
    private readonly tableName = "users"
    private readonly dynamodb: DynamoDBClient
    constructor() {
        this.dynamodb = new DynamoDBClient(config)
    }
    async findAll(options?: any) {
        const queryCommand = new QueryCommand({
            TableName: this.tableName,
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": "USER#"
            }
        })
        const response = await this.dynamodb.send(queryCommand)
        return response.Items
    }
    async findOne() { }
    async create() { }
    async update() { }
    async delete() { }
}