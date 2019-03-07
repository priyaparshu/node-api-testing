const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{value} is not a valid email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validator: {
            validator: (value) => {
                return validator.isLength(value, {
                    min: 6,
                    max: 30
                })
            }
        },
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }]
});
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    //console.log(userObject);
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    //console.log(user);
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
    //console.log('TKN', token);
    user.tokens = user.tokens.concat([{ access, token }]);
    //console.log("Before Return", user);
    //user.tokens({ access, token })
    return user.save().then(() => {
        return token;
    })

};


UserSchema.methods.removeToken = function (token) {
    //pull allows you to remove from array that match some criteria

    var user = this;
    return user.update({
        $pull: {
            tokens: { token }
        }
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log('===========', decoded);
    } catch (e) {
        return Promise.reject();
        // return new Promise((resolve,reject) => {
        //     reject();
        // })
    }
    return User.findOne({
        "_id": decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    })

};
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email }).then((user) => {

        if (!user) {
            return Promise.reject();
        }
        //console.log('User available');
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {

                if (result) {
                    resolve(user)
                } else {
                    reject();

                }



                // if (result) {
                //     console.log('-======================');
                //     console.log('result', user);
                //     resolve(user);
                // } else {
                //     console.log('err', err);
                //     reject();
                // }
            })
        });
    });
};


UserSchema.pre('save', function (next) {
    var user = this;
    //console.log('----------', user);
    if (user.isModified('password')) {
        //console.log('user.isModified', user.isModified('password'));
        bcrypt.genSalt(10, (err, salt) => {
            //console.log(salt);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }


                user.password = hash;
                //console.log("user.password from presave)", user.password);
                next();
            })

        })
    } else {
        next()
    }

})
//return a value that will be then chained in server.js
var User = mongoose.model('User', UserSchema);




module.exports = { User }
//{
//format 
// email : andrew@example.com
//password: 'crypto secure one'
//token: [{
//access: 'auth' -- other types are email, reset pwd
//token: 'crypto strong'
//}]

// var User = mongoose.model('User', {
//     name: String,
// })
// var mongoose = require('mongoose');
// var User1 = new User({
//     name: 'vaibhav',
//     email: 'abc@gmail.com',

// });

// User1.save().then((usr) => {
//     console.log('Saved successfully', usr);
// }, (err) => {
//     console.log(err)
// })
