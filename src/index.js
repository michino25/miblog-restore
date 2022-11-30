const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes');
const methodOverride = require('method-override');
const db = require('./config/db');

// connect to db
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// http logger
app.use(morgan('combined'));

// template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// localhost 127.0.0.1
