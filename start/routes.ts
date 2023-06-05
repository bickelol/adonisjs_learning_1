/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('api/register', 'AuthController.register')
Route.post('api/login', 'AuthController.login')

Route.group(() => {
  Route.post('todos/create', 'TodosController.create')
  Route.get('todos', 'TodosController.list')
  Route.get('todos/get/:id', 'TodosController.get')
  Route.put('todos/update/:id', 'TodosController.update')
  Route.delete('todos/delete/:id', 'TodosController.update')
})
  .middleware('auth:api')
  .prefix('api')
