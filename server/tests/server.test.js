const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const { ObjectID } = require('mongodb');
const { User } = require('../models/user');

const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

// beforeEach((done) => {
//     Todo.deleteMany({}).then(() => done());
// });
beforeEach(populateUsers);
beforeEach(populateTodos);

// describe('POST /todos', () => {
//     it('should create a new todo', (done) => {
//         var text = 'this is a new text to do test';
//         request(app)
//             .post('/todos')
//             .set('x-auth', users[0].tokens[0].token)
//             .send({ text })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);

//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 Todo.find({ text }).then((todos) => {
//                     //expect(todos.length).toBe(9);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((e) => done(e));
//             })
//     });
// });

// it('should not create todo with invalid body data', (done) => {
//     request(app)
//         .post('/todos')
//         .set('x-auth', users[0].tokens[0].token)
//         .send({})
//         .expect(400)
//         .end((err, res) => {
//             if (err) {
//                 return done(err);
//             }
//             Todo.find().then((todos) => {
//                 expect(todos.length).toBe(2);
//                 done();
//             }).catch((e) => done(e));
//         })
// })

// // describe('/todos', () => {
// //     it('Should not allow to save empty text', (done) => {
// //         request(app)
// //             .post('/todos')
// //             .set('x-auth', users[0].tokens[0].token)
// //             .send({})
// //             .expect(400)
// //             .end((err, res) => {
// //                 if (err) {
// //                     return done(err);
// //                 }
// //                 Todo.find().then((todos) => {
// //                     expect(todos.length).toBe(2);
// //                     done();
// //                 }).catch((e) => done(e));
// //             })
// //     })
// // })

// describe('GET /todos', () => {
//     it('should GET all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(1);
//             }).end(done);

//     });
// });

// describe('GET /todos/:id', () => {
//     it('should return todo doc', (done) => {
//         request(app)
//             .get(`/todos/${todos[0]._id.toHexString()}`)
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.text).toBe(todos[0].text);
//             }).end(done);
//     });

//     it('should not return todo doc created by other users', (done) => {
//         request(app)
//             .get(`/todos/${todos[1]._id.toHexString()}`)
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(404)
//             .end(done);
//     });

//     it('should return 404 if todo not found', (done) => {
//         var hexId = new ObjectID().toHexString();
//         request(app)
//             .get(`/todos/${hexId}`)
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(404)
//             .end(done);
//     });

//     it('should return 404 for non-objects ids ', (done) => {
//         request(app)
//             .get('/todos/123abc')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(404)
//             .end(done)
//     });
// });





// describe('DELETE /todos/:id', () => {
//     it('should remove a todo', (done) => {
//         var hexId = todos[1]._id.toHexString();
//         console.log("hexid", hexId);
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 //console.log("---------", res.body.todo._id);
//                 expect(res.body.todo._id).toBe(hexId);
//             }).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 Todo.findById(hexId).then((todo) => {
//                     //console.log("todo", todo);
//                     expect(todo).toNotExist();
//                     done();
//                 }).catch((e) => {
//                     done(e)
//                 })
//             })
//     })



//     it('should not remove a todo from another user', (done) => {
//         var hexId = todos[0]._id.toHexString();
//         console.log("hexid", hexId);
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(404)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 Todo.findById(hexId).then((todo) => {
//                     //console.log("todo", todo);
//                     expect(todo).toExist();
//                     done();
//                 }).catch((e) => {
//                     done(e)
//                 })
//             })
//     })

//     it('should return 404 if todo not found', (done) => {

//         var hexId = new ObjectID().toHexString();
//         console.log("404", hexId);
//         request(app)
//             .delete(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(404)
//             .end(done)

//     });
//     it('should return 404 if object is invalid', (done) => {
//         request(app)
//             .delete('/todos/123abc')
//             .set('x-auth', users[1].tokens[0].token)
//             .expect(404)
//             .end(done)
//     });

// })

// describe('PATCH /todos/:id', () => {
//     it('should update the todo', (done) => {
//         var hexId = todos[0]._id.toHexString();
//         var text = 'this should be the new text';
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .set('x-auth', users[0].tokens[0].token)
//             .send({
//                 completed: true,
//                 text: text
//             })
//             .expect(200)
//             .end(done);

//     })

//     it('should not update the todo of another user', (done) => {
//         var hexId = todos[0]._id.toHexString();
//         var text = 'this should be the new text';
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .send({
//                 completed: true,
//                 text: text
//             })
//             .expect(404)
//             .end(done);

//     })


//     it('should clear completedAt when todo is not completed', (done) => {
//         hexId = todos[1]._id.toHexString();
//         var text = 'this should be the updated text';
//         request(app)
//             .patch(`/todos/${hexId}`)
//             .set('x-auth', users[1].tokens[0].token)
//             .send({
//                 completed: false,
//                 text: text
//             })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todo.text).toBe(text);
//                 expect(res.body.todo.completed).toBe(false);
//                 expect(res.body.todo.completedAt).toBeFalsy();

//             }).end(done)

//     })

// })

// describe('GET /users/me', () => {
//     it('should return user if authenticated', (done) => {
//         request(app)
//             .get('/users/me')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body._id).toBe(users[0]._id.toHexString());
//                 expect(res.body.email).toBe(users[0].email);
//             })
//             .end(done);
//     })

//     it('should return user if authenticated', (done) => {
//         request(app)
//             .get('/users/me')
//             .expect(401)
//             .expect((res) => {
//                 expect(res.body).toEqual({});
//             })
//             .end(done);
//     })
// })
// describe('POST /users', () => {
//     it('should create a user', (done) => {
//         var email = 'example@example.com';
//         var password = '123mnb!';
//         request(app)
//             .post('/users')
//             .send({ email, password })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.headers['x-auth']).toExist();
//                 expect(res.body._id).toExist();
//                 expect(res.body.email).toBe(email);
//             })
//             .end((err) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 User.findOne({ email }).then((user) => {
//                     expect(user).toExist();
//                     //check if pwd is hashed or not
//                     expect(user.password).toNotBe(password);
//                     done();
//                 }).catch((err) => done(err));
//             });
//     });

//     it('should return validation error if request invalid', (done) => {
//         // var email = 'andrew.example.com';
//         // var password = '1';
//         request(app)
//             .post('/users')
//             .send({
//                 email: 'and',
//                 password: '123'
//             })
//             .expect(400)
//             .end(done);
//     })

//     it('should not create user if email in use', (done) => {

//         request(app)
//             .post('/users')
//             .send({
//                 email: users[0].email,
//                 password: 'password123!'
//             })
//             .expect(400)
//             .end(done);
//     })
// })

// describe('DELETE /user/me/token', () => {
//     it('should remove auth token on logoout', (done) => {
//         request(app)
//             .delete('/users/me/token')
//             .set('x-auth', users[0].tokens[0].token)
//             .expect(200)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 User.findById(users[0]._id).then((user) => {
//                     expect(user.tokens.length).toBe(0);
//                     done();
//                 }).catch((e) => done(e));

//             })
//     })
// })

describe('POST /users/login', () => {
    //     it('should login user and return auth token', (done) => {

    //         request(app)
    //             .post('/users/login')
    //             .send({
    //                 email: users[1].email,
    //                 password: users[1].password
    //             })
    //             .expect(200)
    //             .expect((res) => {
    //                 expect(res.headers['x-auth']).toExist();

    //             })
    //             .end((err, res) => {
    //                 if (err) {
    //                     //console.log('oops error');
    //                     return done(err);
    //                 }

    //                 User.findById(users[1]._id).then((user) => {
    //                     //console.log("=================", user);
    //                     //console.log("res-auth", res.headers['x-auth']);
    //                     //console.log("*******************", user.tokens[0].token);
    //                     expect(user.tokens[1]).toInclude({
    //                         access: 'auth',
    //                         token: res.headers['x-auth']
    //                     });
    //                     done();
    //                 }).catch((err) => done(err));
    //             });
    //     });


    it('should reject invalid user login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + '1'
            })
            .expect(400)
            .expect((res) => {

                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {

                if (err) {
                    console.log('oops error');
                    return done(err);
                }
                console.log("RES", res);
                User.findById(users[1]._id).then((user) => {
                    console.log('Found this', user);
                    expect(user.tokens.length).toBe(1);
                    console.log('findby', user);
                    done();
                }).catch((err) => done(err));
            });
    });
})

