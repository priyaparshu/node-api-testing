const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

var id = '5c6363f4bc6bbf0947f1051711';

var uid = '5c3160cc451df01662c39d8d';

if (!ObjectID.isValid(uid)) {
    return res.status(404).send();
    //console.log('UserId is invalid');
}
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
// Todo.find({//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// }).catch((e) => {
//     console.log(e)
// })

// //get single document
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo)
// }).catch((e) => {
//     console.error(e);
// })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todos by Id', todo);
// }).catch((e) => {
//     console.log(e);
// })

User.findById(uid).then((user) => {
    if (!user) {
        return res.status(404).send();
        //return console.log('User not found');
    }
    res.send({ user });
    //console.log('User', user);
    //console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    res.status(400).send();
    //console.log('error', e)
})