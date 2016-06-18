var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    displayName: String,
    username: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
