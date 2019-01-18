var mongoose = require('mongoose');


var User = mongoose.model('User', {
    name: String,
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
});
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

module.exports = { User }