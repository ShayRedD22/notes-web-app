const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//login admin 
passport.use('local.signinAd', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    console.log(req.body);

    const rows = await pool.query('SELECT * FROM admin WHERE username = ?',[username]);

    if (rows.length > 0){
        const admin = rows[0];

        const validPassword = await helpers.login(password, admin.password);

        if(validPassword){
            done(null, admin, req.flash('success'));
        }else{
            done(null, admin, req.flash('message', 'Incorrect Password'));
        }
    }else {
        return done(null, false, req.flash('message', 'The Username does not exists PLIS create one new'));
    }
}))

//registro 
passport.use('local.signupAd', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true


}, async (req, username, password, done) =>{
    const {fullname} = req.body;
    const newAdmin ={
        username,
        password,
        fullname
    };

    newAdmin.password = await helpers.encryptPassword(password);

    const result = await pool.query('insert into admin set ?', [newAdmin]);

    return done(null, newAdmin);
}));

//para el registro
passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

//para el logueo

passport.deserializeUser(async (id, done) =>{
    const rows = await pool.query('select * from admin where id = ?', [id]);
    done(null, rows[0]);
});