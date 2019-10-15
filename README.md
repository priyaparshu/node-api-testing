# node-api-testing

In this application we are building REST api that manages a Todo application. We will be able to perform 
ie create,update,delete,find operations. For database we will be using mongodb - a very popular nosql database 
will help us to persist user information as well as Todo information. We will be using mongoose - a library which helps us to work with mongodb.
Mongoose is a ORM (object relational mapping which helps you to structure your data. Everything in mongoose starts with a schema. 
It helps to define properties and perform custom validations.

Following are the routes for Todo application:
GET /todos :
POST /todos :
GET /todos/:id :


Testing:
To test our node application, we will be using mocha which is a framework to test suits. It makes asynchronous testing easy and fun. We will be using 
expect as the assertion library.
