const passport = require("passport");

//cifrafo de contraseña
const bcryptjs = require('bcryptjs');

const helpers = {};

//registro
helpers.encryptPassword = async (password) =>{
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
};

//logueo
helpers.login = async (password, savedPasword) => {
    try{
       return await bcryptjs.compare(password, savedPasword);
    }catch(e){
        console.log(e);
    }
};

module.exports = helpers;