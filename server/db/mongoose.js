var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }).then(() => {
//     console.log('Successfully connected');
// }).catch((err) => {
//     console.log('Connection failed', err)
// })

module.exports = { mongoose }