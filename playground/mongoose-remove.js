const { ObjectID } = require('mongodb');
const { Todo } = require('../server/models/todo');
const { Users } = require('../server/models/user');
const { mongoose } = require('../server/db/mongoose');

//---- Remove everything :Todo.remove({}) -- does nt returns doc
//---- Remove one :Todo.findOneAndRemove({})  takes Queryobject returns doc
//---- Remove everything :Todo.findByIdAndRemove({})  returns doc


Todo.findByIdAndRemove('5c75bd49870dc807991e4e1e').then((doc) => {
    console.log(doc);
})

Todo.findOneAndRemove({ "_id": '5c75bd49870dc807991e4e1f' }).then((doc) => {
    console.log(doc);
})