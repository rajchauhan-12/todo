import { v4 as uuidv4 } from 'uuid'
import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import { getUploadUrl } from '../fileStorage/attachmentUtils.mjs'

const todosAccess = new TodosAccess()

export async function getTodos(userId) {
    return await todosAccess.getTodos(userId)
    
}
export async function createTodo(createTodoRequest, userId) {
    const todoItem = {
        userId,
        todoId: uuidv4(),
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false
    }

    await todosAccess.createTodo(todoItem)
    return todoItem
    
}
export async function updateTodo(
    userId,
    todoId,
    updatedTodo
){
    await todosAccess.updateTodo(
        userId,
        todoId,
        updatedTodo
    )
}
export async function deleteTodo(userId,todoId) {
    await todosAccess.deleteTodo(
        userId,
        todoId
    )
}

export async function generateUploadUrl(userId, todoId) {

    const uploadUrl = await getUploadUrl(todoId)

    const attachmentUrl =`https://${process.env.ATTACHMENT_S3_BUCKET}.s3.amazonaws.com/${todoId}`

    await todosAccess.updateAttachmentUrl(
        userId,
        todoId,
        attachmentUrl
    )

    return uploadUrl
}
