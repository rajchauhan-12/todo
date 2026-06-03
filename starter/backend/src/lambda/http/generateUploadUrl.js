import { getUserId } from '../utils.mjs'
import { generateUploadUrl } from '../../businessLogic/todos.mjs'
export async function handler(event) {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const userId = getUserId(event)

    const uploadUrl = await generateUploadUrl(userId, todoId)

      return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true
      },
      body: JSON.stringify({
        uploadUrl
      })
    }
}

