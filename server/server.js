
require('./config/config')
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');
const { ObjectId } = require('mongodb');


//mongoose.Promise = global.Promise


var app = express();

const port = process.env.PORT;
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    //console.log(ObjectId);
    console.log('++', id);
    if (!ObjectId.isValid(id)) {
        console.log("id not found", ObjectId.isValid);
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        //console.log("todo-del", todo.id);
        if (!todo) {
            return res.status(404).send();
        }
        //console.log("todo-", todo);
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send();
    });
});
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
    //res.send(req.params);
    var id = req.params.id;
    //console.log(id);
    if (!ObjectId.isValid(id)) {
        //console.log('Id not found');
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        return res.status(400).send();
    });
})

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    //console.log(body);
    var user = new User(body);
    user.save().then(() => {
        // generate token 
        //console.log("USR", user);
        return user.generateAuthToken();
    }).then((token) => {
        // console.log('----------');
        //console.log('token', token);
        res.header('x-auth', token).send(user);
        //console.log("user==", user)
    }).catch((err) => {
        res.status(400).send(err);
    });

})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.get('/users/:id', (req, res) => {
    //res.send(req.params);
    var id = req.params.id;
    //console.log(id);
    if (!ObjectId.isValid(id)) {
        //console.log('Id not found');
        return res.status(404).send();
    }
    User.findById(id).then((user) => {
        if (!user) {
            res.send(404).send();
        }
        res.send({ user });
    }).catch((e) => {
        res.send(400).send();
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //

    //console.log(id);
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid) {
        res.statusCode(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    // to get new updated value back
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    })
})
module.exports = { app };


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
