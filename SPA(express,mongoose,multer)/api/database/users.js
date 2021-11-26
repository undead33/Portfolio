const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    searchParams: {
        searchText: {type: String},
        searchType: {type: String},
        active: {type: String},
        resultWiev: {type: String}
    }
});

module.exports = model('users', userSchema);