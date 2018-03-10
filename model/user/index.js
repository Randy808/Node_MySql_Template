let knex = require('../../config/db_config.js').knex;
let {promiseErr} = require('../common/ErrorHandler.js');
const bcrypt = require('bcrypt');
const User = require('./User.js');



let promiseErrCallback = (err) => {
            return {
                success: false,
                error: {
                    code: err.code,
                    errno: err.errno
                }
            };
        };


exports.login = function(user_name, password) {
        let qb = knex('user').select('*')
        .where({
            "user_name": user_name,
            "password": password,
        });

        return qb
        .then( (result, err) => {
            if(err) throw err;
            if(result.length < 1){
                throw {
                    "code": "INVALID_CREDENTIALS",
                    "errno": 1
                }
            }
            let response = {};
            response.success = true;
            return response;
        })
        .catch(promiseErrCallback);
};




exports.register = function(user_name, password, email) {

    user_name = user_name != undefined ? user_name : "";
    email = email != undefined ? email : "";
    password = password != undefined ? password : "";

    if (user_name.length < 5) {
        return promiseErr( {
            "success": false,
            "err_msg": "Username Too Short"
        });
    }
    if (email.match(".+@.+") == null) {
        return promiseErr( {
            "success": false,
            "err_msg": "Invalid Email Format"
        });
    }
    if (password.length < 6) {
        return promiseErr({
            "success": false,
            "err_msg": "Password Too Short"
        });
    }

    let hashed_password = bcrypt.hashSync(password, 10);

    return User.register(user_name, hashed_password, email).then(function(result) {
        return result;
    });
};
