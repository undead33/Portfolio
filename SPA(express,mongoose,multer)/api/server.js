const express = require('express'),
    app = express(),
    config = require('config'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    path = require('path');
    PORT = process.env.PORT || 4000;

(async function start() {
    try {
        await mongoose.connect('mongodb+srv://undead33:89417asa@cluster0.i98fo.mongodb.net/employee-management', {useNewUrlParser: true});

        app.listen(PORT, () => console.log('Server has been started...'));
    } catch (err) {
        console.log(err);
    }
})();

app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use(express.static('img'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	  next();
});

app.use(
    require(config.get('routes.user__log_in')),
    require(config.get('routes.user__save_search_params')),
    require(config.get('routes.positions_structure')),
    require(config.get('routes.position__add')),
    require(config.get('routes.position__edit')),
    require(config.get('routes.position__remove')),
    require(config.get('routes.employees_search')),
    require(config.get('routes.employee__remove')),
    require(config.get('routes.employee__info'))
);