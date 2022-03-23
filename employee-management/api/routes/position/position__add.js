const express = require('express'),
    router = express.Router(),
    config = require('config'),
    positions = require(config.get('database.positions'));

router.use(express.json());

router.put('/api/position/add', (req, res) => {
    const input = req.body,
        newPosition = new positions({
        photo: 'http://localhost:4000/employees/vacant.png',
        status: '',
        sex: '',
        namesEng: ['vacant'],
        namesRus: [],
        patronymicRus: '',
        department: '',
        project: '',
        position: '',
        lastPromotion: '',
        phoneMob: '',
        phoneStat: '',
        email: '',
        skype: '',
        hireDate: '',
        vacationStartDate: '',
        birthDate: '',
        find: 'find',
        employee: '0'
    });

    for (key in input) newPosition[key] = input[key];

    newPosition.save(err => {
        if (err) return console.log(err);
        console.log('Position was successfully added');/////////////////
        res.send(newPosition);
    });
});

module.exports = router;