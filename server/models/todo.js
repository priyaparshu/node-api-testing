var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: { type: String, required: true, minlength: 1, trim: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Number, default: null }
});

module.exports = { Todo };
// var newTodo = new Todo({
//     text: "  Return books  "
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// var todo2 = new Todo(
//     {
//         text: 'Do shopping',
//         completed: true,
//         completedAt: 123
//     });

// todo2.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
//     //console.log(Json.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save todo', e);
// });
