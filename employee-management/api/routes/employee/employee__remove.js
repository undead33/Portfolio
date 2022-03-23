const express = require('express'),
    router = express.Router(),
    config = require('config'),
    positions = require(config.get('database.positions'));

router.use(express.json());

router.get('/api/employee/remove/:id', (req, res) => {
    const vacantPosition = {
        photo: 'http://localhost:4000/employees/vacant.png',
        status: '',
        sex: '',
        namesEng: ['vacant'],
        namesRus: [],
        patronymicRus: '',
        project: '',
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
    };

    positions.findById(req.params.id, (err, result) => {
        if (err) return console.log(err);

        for (key in vacantPosition) result[key] = vacantPosition[key];

        result.save(err => {
            if (err) throw err;
            console.log('Position was successfully updated');///
            res.sendStatus(204);
        });
    });
});

module.exports = router;