var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');



//mongoose.Promise = global.Promise


var app = express();
app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//     var todo = new Todo({
//         text: req.body.text
//     })
//     todo.save().then((doc) => {
//         res.send(doc);
//     }, (e) => {
//         res.statusCode(400).send(e);
//     })
// })

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
})
// todo2.save().then((doc) => {
//     res.send(doc);
// }, (err) => {
//     res.statusCode(401).send(err);
// })


module.exports = { app };


app.listen(5000, () => {
    console.log('listening on port 5000')
});

