const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const { ObjectID } = require('mongodb');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

beforeEach((done) => {
    Todo.remove({}).then(() => {
        console.log("_id", todos[0]._id);
        console.log("_id", todos[1]._id);
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'this is a new text to do test';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    //expect(todos.length).toBe(9);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
});




describe('/todos', () => {
    it('Should not allow to save empty text', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    })
})

describe('GET /todos', () => {
    it('should GET all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);

    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);

    })


    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-objects ID', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done)
    })

})
describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        console.log("hexid", hexId);
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                //console.log("---------", res.body.todo._id);
                expect(res.body.todo._id).toBe(hexId);
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    //console.log("todo", todo);
                    expect(todo).toNotExist;
                    done();
                }).catch((e) => {
                    done(e)
                })
            })
    })

    it('should return 404 if todo not found', (done) => {

        var hexId = new ObjectID().toHexString();
        console.log("404", hexId);
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)

    });
    it('should return 404 if object is invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done)
    });

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'this should be the new text';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof (res.body.todo.completedAt)).toBe('number')
                console.log(typeof (completedAt))
            }).end(done);

    })


    it('should clear completedAt when todo is not completed', (done) => {
        hexId = todos[1]._id.toHexString();
        var text = 'this should be the updated text';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();

            }).end(done)

    })

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();


        request(app)
            .patch(`/todos/${hexId}`)
            .expect(404)
            .end(done);


        it('should return 404 for non-objects ID', (done) => {
            request(app)
                .patch('/todos/123abc')
                .expect(404)
                .end(done)
        })
    })
})