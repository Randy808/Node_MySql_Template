const bcrypt = require('bcrypt');
let knex = require('../../config/db_config.js').knex;
let {promiseErr,promiseErrCallback} = require('../common/ErrorHandler.js');




exports.register = function(user_name, password, email) {
        let qb = knex('user').insert({
            "user_name": user_name,
            "password": password,
            "email": email
        });

        return qb
        .then( (result, err) => {
            if(err) throw err;
            let response = {};
            response.success = true;
            response.insert_id = result[0];
            return response;
        })
        .catch(promiseErrCallback);
};