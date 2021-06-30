const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
//const bodyParser = require('body-parser');

 const { database } = require('./keys');

//inicialisaciones
const app = express();
require('./lib/passport');


//configuraciones
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layout'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//funciones que se ejecutan cada ves que un usuario envia una peticion al servidor
app.use(session({
  secret: 'conectmysqlsession',
  resave:false,
  saveUninitialized: false,
  store: new MySQLStore(database)

}));

app.use(flash()); 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




//variables globales
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});


//rutas
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/contacs', require('./routes/contacts'));
app.use('/notes', require('./routes/notes'));
app.use('/profile', require('./routes/profile'));






//archivos publicos
app.use(express.static(path.join(__dirname, 'public')));




//Starting server
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });