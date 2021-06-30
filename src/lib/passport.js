const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers =require('../lib/helpers');


//LOGIN USER IN APP WEB NOTES  
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

    console.log(req.body);

  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    
    const validPassword = await helpers.login(password, user.password);

    if (validPassword) {
      done(null, user, req.flash('success'));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists PLIS Create one new.'));

  }
}))


//registro
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true

}, async (req, username, password, done) => {
  const {fullname} = req.body;
  const newUser ={
      username,
      password,
      fullname
  };

   newUser.password = await helpers.encryptPassword(password);

   const result = await pool.query('insert into users  set ?', [newUser]);
   
   newUser.id = result.insertId;
   
   return done(null, newUser);  	
  
  // console.log(result);
  // console.log(req.body);

}));


//para el registro 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


//esto es para el login 
  passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});




