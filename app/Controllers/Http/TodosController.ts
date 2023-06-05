import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async list({ request }: HttpContextContract) {
    const todos = await Todo.query()
    return todos
  }

  public async get({ request, params }: HttpContextContract) {
    try {
      const todo = await Todo.find(params.id)
      if (todo) {
        return todo
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const todo = await Todo.find(params.id)
    if (todo) {
      todo.title = request.input('title')
      todo.description = request.input('description')
      todo.done = request.input('done')

      if (await todo.save()) {
        return todo
      }
      return // 422
    }
    return // 401
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const todo = new Todo()
    todo.title = request.input('title')
    todo.description = request.input('description')
    await todo.save(todo)
    return todo
  }

  public async delete({ auth, request, params, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const todo = await Todo.query().where('id', params.id).delete()
    return response.json({ message: 'Deleted successfully' })
  }
}
