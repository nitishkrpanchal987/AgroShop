const bcrypt = require('bcrypt');

const hashPassword = async(password)=>{
    try{
        const saltsRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltsRounds);
        return hashedPassword;
    }catch(error){
        //console.log(error);
    }
}

const compare = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {hashPassword, compare};