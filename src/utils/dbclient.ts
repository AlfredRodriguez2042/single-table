import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
interface keys {
    sk: string
    pk: string
}
interface FindOptions{
    pk:string
    sk?:string
}
interface FindOneOptions{
select:string[]
}
const config = { endpoint: "http://localhost:8000", region: "us-east-1", credentials: { secretAccessKey: "sasa", accessKeyId: "red" } }
export default class DBClient {
    public readonly tableName = process.env.TABLE_NAME
    public readonly dynamodb: DynamoDBClient
    constructor() {
        this.dynamodb = new DynamoDBClient(config)
    }
    async findAll(options: FindOptions) {
        const values = Object.keys(options).reduce((acc,curr)=>({...acc,[`:${curr}`]:options[curr as 'pk']}),{})
        const query = options.sk?"pk = :pk and begins_with(sk,:sk)":"pk = :pk"
        const queryCommand = new QueryCommand({
            TableName: this.tableName,
            KeyConditionExpression: query,
            ExpressionAttributeValues: values
        })
        const response = await this.dynamodb.send(queryCommand)
        return response.Items
    }
    async findOne(keys: keys,options?:FindOneOptions) {
        const getCommand = new GetCommand({
            TableName: this.tableName,
            Key: keys,
            AttributesToGet:options?.select
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
    async update(keys:keys,values:any) {
        const queryExpression = Object.keys(values).reduce((acc,curr)=>`${acc} ${curr} = :${curr}`,"set").replace(/,\s*$/,"")
        const arrtibuteValues =Object.keys(values).reduce((acc,curr)=>({...acc,[`:${curr}`]:`${values[curr]}`}),{}) 
        const command = new UpdateCommand({
            TableName:this.tableName,
            Key:keys,
            UpdateExpression:queryExpression,
            ExpressionAttributeValues:arrtibuteValues
        })
        const response = await this.dynamodb.send(command)
        return response.Attributes
     }
    async delete() { }
    async getLastId(id:string) {
        const getCommand = new GetCommand({
            TableName: this.tableName,
            Key: { pk: "metadata", sk: "metadata" },
            AttributesToGet: [id]
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