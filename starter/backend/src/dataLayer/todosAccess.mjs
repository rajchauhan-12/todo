import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
    UpdateCommand,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb'

const client = AWSXRay.captureAWSv3Client(
  new DynamoDBClient({})
)
const docClient = DynamoDBDocumentClient.from(client)

const todosTable = process.env.TODOS_TABLE

export class TodosAccess {
    async getTodos(userId) {
        const result = await docClient.send(
            new QueryCommand({
                TableName: todosTable,
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId' : userId
                }
            })
        )
        return result.Items
    }

    async createTodo(todoItem){
        await docClient.send(
            new PutCommand({
                TableName: todosTable,
                Item: todoItem
            })
        )
    }

    async updateTodo(userId,todoId, updatedTodo) {
        await docClient.send(
            new UpdateCommand({
                TableName: todosTable,
                Key: {
                    userId,
                    todoId
                },
                UpdateExpression:
                'set #name = :name, dueDate = :dueDate, done = :done',

                ExpressionAttributeNames: {
                    '#name': 'name'
                },
                ExpressionAttributeValues: {
                    ':name': updatedTodo.name,
                    ':dueDate': updatedTodo.dueDate,
                    ':done': updatedTodo.done
                }
            })
        )
    }

    async updateAttachmentUrl(userId, todoId, attachmentUrl){
        await docClient.send(
            new UpdateCommand({
                TableName: todosTable,
                Key: {
                    userId,
                    todoId
                },
                UpdateExpression:
                'set attachmentUrl = :attachmentUrl' ,

                ExpressionAttributeValues: {
                    ':attachmentUrl' : attachmentUrl
                }
            })
        )
    }
    
    async deleteTodo(userId,todoId) {
        await docClient.send(
            new DeleteCommand({
                TableName: todosTable,
                Key: {
                    userId,
                    todoId
                }
            })
        )
    }
}
