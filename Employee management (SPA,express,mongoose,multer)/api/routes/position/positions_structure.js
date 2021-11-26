const express = require('express'),
    router = express.Router(),
    config = require('config'),
    positions = require(config.get('database.positions'));

router.get('/api/positions_structure', (req, res) => {
    const query = positions.where({find: 'find'});

    query.find((err, result) => {
        if (err) return console.log(err);
        
        result ? res.send(JSON.stringify(result)) : res.sendStatus(404);
    });
});

module.exports = router;