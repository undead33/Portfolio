const express = require('express'),
    router = express.Router(),
    config = require('config'),
    positions = require(config.get('database.positions'));

router.delete('/api/position/remove/:id', (req, res) => {
    positions.findByIdAndRemove(req.params.id, err => {
        if (err) return console.log(err);
        console.log('Position was successfully removed');/////////////////
        res.sendStatus(204);
    });
});

module.exports = router;