const express = require('express'),
    router = express.Router(),
    config = require('config'),
    positions = require(config.get('database.positions'));

router.use(express.json());

router.get('/api/employee/:id', (req, res) => {
    positions.findById(req.params.id, (err, result) => {
        if (err) return console.log(err);

        result ? res.send(JSON.stringify(result)) : res.sendStatus(404);
    });
});

module.exports = router;