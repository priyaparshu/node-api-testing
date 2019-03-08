const bcrypt = require('bcryptjs');

var password = '123abc!!';
//var password = 'userTwoPass1';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
    //hashed = '$2a$10$dFQd9v9PTs.6DKXrfYQah.UNtR8oQTAGjDSAWWVcIStPacKta.Uqa'
    //hashed = '$2a$10$g5ZM8TFyJKGNOZ4nK/wDoO1IcafPnFWmzrc0a.q1/Yyj4RvSyLbn'

    hashed = '$2a$10$6wguxhSsB2q5dYbsCGxvvOt8TUbHFQHKSZd7HPmihEeqifWOA/Y16'
    bcrypt.compare(password, hashed, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res)
    })
})









// const { SHA256 } = require('crypto-js');
// const jwt = require('jsonwebtoken');

// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);









// // var message = "I am user number 3";
// // var hash = SHA256(message).toString();
// // console.log(`Message: ${message} has a hash value <${hash}>`)


// // var data = {
// //     id: 4
// // };
// // var token = {
// //     data,
// //     hash: SHA256(JSON.stringify(data) + "secret").toString()
// // }
// // //man in the middle

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data).toString());



// // var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// // if (token.hash === resultHash) {
// //     console.log('good to go');
// // } else {
// //     console.log('not good')
// // }