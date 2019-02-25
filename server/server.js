var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

const { ObjectId } = require('mongodb');


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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
});

// api for querystring

// app.get('/todos/:id', (req, res) => {
//     console.log(res.params)
// })

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!ObjectId.isValid(id)) {
        console.log('Id not found');
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
})
module.exports = { app };


app.listen(5000, () => {
    console.log('listening on port 5000')
});
