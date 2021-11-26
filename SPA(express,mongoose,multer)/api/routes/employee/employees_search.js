const express = require('express'),
    router = express.Router(),
    config = require('config'),
    position = require(config.get('database.positions'));

router.use(express.json());

router.post('/api/employees_search', (req, res) => {
    const query = position.where({employee: '1'});
    console.log(req.body)////////////////////////
    query.find((err, result) => {
        if (err) return console.log(err);

        result ? res.send(searchEmployees(req.body, result)) : res.sendStatus(404);
    });
});

function searchEmployees(request, result) {
    const regex = new RegExp(`^${request.searchText}`, 'i'),
        nE = 'namesEng',
        nR = 'namesRus';

    if (request.searchType == 'all') return result;

    return result.filter(e => {
        switch (request.searchType) {
            case 'name':
            case null:
                return regex.test(e[nE].join(' ')) || regex.test(e[nR].join(' ')) 
                    || regex.test(`${e[nE][1]} ${e[nE][0]}`) || regex.test(`${e[nR][1]} ${e[nR][0]}`);
      
            case 'department':
            case 'project':
                return e[request.searchType].toLowerCase().startsWith(request.searchText.toLowerCase());
        }
    });
}

module.exports = router;