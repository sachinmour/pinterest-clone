var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
    title: String,
    src: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
