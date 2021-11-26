const express = require('express'),
    router = express.Router(),
    config = require('config'),
    users = require(config.get('database.users'));

router.put('/api/user/save_search_params/:id', (req, res) => {
    const newSearchParams = req.body;

    users.findById(req.params.id, (err, result) => {
        if (err) return console.log(err);

        for (key in newSearchParams) result.searchParams[key] = newSearchParams[key];

        result.save(err => {
            if (err) throw err;
            console.log('New search params are saved');/////////////////
            res.sendStatus(204);
        });
    });
});

module.exports = router;