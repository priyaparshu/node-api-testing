const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


const { ObjectId } = require('mongodb');

var uid = '5c3160cc451df01662c39d8dAA';

User.findById(uid).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (err) => {
    console.log(err);
})
    ;



// var id = '5c4627e55a6a7c0a127a364b1';

// if (!ObjectId.isValid(id)) {
//     console.log('Id not found');
// }
// Todo.find({
//     _id: id
// }).then((todos) => console.log('Todos', todos));

// Todo.findOne({
//     _id: id
// }).then((todo) => console.log('Todo', todo));

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((err) => console.log(err));

