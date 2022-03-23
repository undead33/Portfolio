const express = require('express'),
    router = express.Router(),
    config = require('config'),
    users = require(config.get('database.users'));

router.use(express.json());

router.post('/api/user/log_in', (req, res) => {
    const input = req.body;

    const query = users.where({login: `${input.login}`});
    
    query.find((err, result) => {
        if (err) return console.log(err);

        if (+result === 0) return res.send({error: 'login', message: 'Entered login doesn`t exist!'});

        result[0].password === input.password ? res.send(JSON.stringify(result[0])) 
            : res.send({error: 'password', message: 'You have entered wrong password!'});
    });
});

module.exports = router;