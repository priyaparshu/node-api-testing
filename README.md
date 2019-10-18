# node-api-testing

In this application I are building a REST api that manages a Todo application. I will be able to perform CRUD operations like
create,update,delete,find. For database I will be using mongodb - a very popular nosql database which will help us to persist user information as well as Todo information. I will be using mongoose - a library which helps to work with mongodb. Mongoose is a ORM (object relational mapping which helps to structure the data. It also helps to define properties and perform custom validations. Everything in mongoose starts with a schema. 

Following are the routes for my Todo application:
GET /todos : to get all todo
POST /todos : to create a new todo
GET /todos/:id :to get a todo with specific id
patch('/todos/:id'): to update a todo
Delete('/todos/:id'): to delete a todo

Testing:
To test my application, I will be using mocha which is a framework of test suits. It makes asynchronous testing easy and fun. I will be using expect as the assertion library.

Other Library used:
lodash : to pick the fields that a user is allowed to update.
