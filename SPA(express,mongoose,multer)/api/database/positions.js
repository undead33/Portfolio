const {Schema, model} = require('mongoose');

const positionSchema = new Schema({
    photo: {type: String, required: true, max: 100},
    status: {type: String, max: 10},
    sex: {type: String, max: 10},
    namesEng: [],
    namesRus: [],
    patronymicRus: {type: String, max: 100},
    department: {type: String, required: true, max: 100},
    project: {type: String, max: 100},
    position: {type: String, required: true, max: 100},
    lastPromotion: {type: String, max: 100},
    phoneMob: {type: String, max: 100},
    phoneStat: {type: String, max: 10},
    email: {type: String, max: 100},
    skype: {type: String, max: 100},
    hireDate: {type: String, max: 10},
    vacationStartDate: {type: String, max: 10},
    birthDate: {type: String, max: 10},
    find: {type: String, required: true, max: 4},
    employee: {type: String, required: true, max: 1}
});

module.exports = model('positions', positionSchema);