import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
interface keys {
    sk: string
    pk: string
}
interface FindOptions{
    pk:string
}
const config = { endpoint: "http://localhost:8000", region: "us-east-1", credentials: { secretAccessKey: "sasa", accessKeyId: "red" } }
export default class DBClient {
    public readonly tableName = process.env.TABLE_NAME
    public readonly dynamodb: DynamoDBClient
    constructor() {
        this.dynamodb = new DynamoDBClient(config)
    }
    async findAll(options: FindOptions) {
        const queryCommand = new QueryCommand({
            TableName: this.tableName,
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": options.pk,
              
            }
        })
        const response = await this.dynamodb.send(queryCommand)
        return response.Items
    }
    async findOne(keys: keys) {
        const getCommand = new GetCommand({
            TableName: this.tableName,
            Key: keys
        })
        const response = await this.dynamodb.send(getCommand)
        return response.Item
    }
    async create(item: any) {
        const putCommand = new PutCommand({
            TableName: this.tableName,
            Item: item
        })
        const userCreated = await this.dynamodb.send(putCommand)
        return userCreated
    }
    async update() { }
    async delete() { }
    async getLastId() {
        const getCommand = new GetCommand({
            TableName: this.tableName,
            Key: { pk: "metadata", sk: "metadata" },
            AttributesToGet: ['lastId']
        })
        const metadata = await this.dynamodb.send(getCommand)
        return metadata.Item
    }
    async updateLastId(id:string) {
        const updateCommand = new UpdateCommand({
            TableName: this.tableName,
            Key: { pk: "metadata", sk: "metadata" },
            ConditionExpression: "attribute_exists(pk)",
            UpdateExpression: `SET ${id} = ${id} + :val`,
            ExpressionAttributeValues: {
                ":val": 1
            }
        })
        const metadata = await this.dynamodb.send(updateCommand)
        return metadata
    }
}