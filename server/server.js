
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
// app.post('/todos', authenticate, (req, res) => {
//     console.log('creator', req.todo._creator);
//     var todo = new Todo({
//         text: req.body.text,
//         _creator: req.user._id

//     });


app.post('/todos', authenticate, (req, res) => {
    //console.log('creator', req._creator);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id

    });

    todo.save().then((doc) => {
        //console.log('c', doc);
        res.send(doc);

    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    //console.log(ObjectId);
    //console.log('++', id);
    if (!ObjectId.isValid(id)) {
        //console.log("id not found", ObjectId.isValid);
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
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

app.get('/todos', authenticate, (req, res) => {
    //console.log('creator get', req);
    Todo.find({ _creator: req.user._id }).then((todos) => {
        //console.log('creator-----', req.user._id);
        //console.log('todos', todos[0]._creator);
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
});

// api for querystring

// app.get('/todos/:id', (req, res) => {
//     console.log(res.params)
// })

app.get('/todos/:id', authenticate, (req, res) => {
    //res.send(req.params);
    var id = req.params.id;
    //console.log(id);
    if (!ObjectId.isValid(id)) {
        //console.log('Id not found');
        return res.status(404).send();
    }

    Todo.findOne({

        _id: id,
        _creator: req.user._id

    }).then((todo) => {
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
    console.log("email already exist", body);
    var user = new User(body);
    user.save().then((user) => {
        // generate token 
        //console.log("USR", user);
        return user.generateAuthToken();
    }).then((token) => {
        //console.log('----------');
        //console.log('token', token);
        res.header('x-auth', token).send(user);
        //console.log("user==", user)
    }).catch((err) => {
        //console.log('generatetoken -err');
        res.status(400).send(err);
    });

})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.get('/users/:id', (req, res) => {
    //res.send(req.params);
    var id = req.params.id;
    console.log(id);
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

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;


    //console.log('id', id);
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
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id

    }, { $set: body }, { new: true }).then((todo) => {
        //console.log('toto', todo);
        if (!todo) {
            res.status(404).send();
        }
        //console.log('send', todo);
        res.send({ todo })
    }).catch((e) => {
        console.log('inside catch of findbyid');
        res.status(400).send();
    })
})
//POST /users/login{email,password}
app.post('/users/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    console.log("BODY", body);

    User.findByCredentials(body.email, body.password).then((user) => {
        console.log("user", user);
        console.log("passwd", body.password);
        //res.send(user);
        return user.generateAuthToken().then((token) => {
            //console.log('new-token', token);
            res.header('x-auth', token).send(user);
            // })
        }).catch((e) => {
            console.log('findbycred-errblk');
            res.statusCode(400).send();
        });
    });
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
module.exports = { app };