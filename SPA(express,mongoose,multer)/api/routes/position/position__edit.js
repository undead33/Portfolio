const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    config = require('config'),
    positions = require(config.get('database.positions')),
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './img/employees')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    upload = multer({ storage: storage });

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.post('/api/position/edit/:id', upload.single('avatar'), (req, res) => {
    const updatedPosition = req.body;

    if (req.file) updatedPosition.photo = `http://localhost:4000/employees/${req.file.originalname}`;

    updatedPosition.project = updatedPosition.project || 'projectless';
    updatedPosition.employee = '1';
    updatedPosition.namesEng = updatedPosition.namesEng.split(' ');
    updatedPosition.namesRus = updatedPosition.namesRus.split(' ');

    positions.findById(req.params.id, (err, result) => {
        if (err) return console.log(err);

        for (key in updatedPosition) result[key] = updatedPosition[key];

        result.save(err => {
            if (err) throw err;
            console.log('Position was successfully updated');//////
        });
    });

    res.write(`<script>location = 'http://localhost:5000/#/position/${req.params.id}/info'</script>`);
});

module.exports = router;