console.log("GETTODOS VERSION 12345")

import { getTodos } from "../../businessLogic/todos.mjs"
import { getUserId } from "../utils.mjs"

export async function handler(event) {

  console.log("STEP 1")

  const userId = getUserId(event)

  console.log("STEP 2 USERID =", userId)

  const items = await getTodos(userId)

  console.log("STEP 3 ITEMS =", items)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items
    })
  }
}