const { ObjectID } = require('mongodb');
const { Todo } = require('../../models/todo');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId,
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userone = new User(users[0]).save();
        var usertwo = new User(users[1]).save();


        return Promise.all([userone, usertwo])

    }).then(() => done());

};
const populateTodos = (done) => {

    Todo.remove({}).then(() => {
        //console.log("_id", todos[0]._id);
        //console.log("_id", todos[1]._id);
        return Todo.insertMany(todos);
    }).then(() => done());
}

module.exports = { todos, populateTodos, populateUsers, users }