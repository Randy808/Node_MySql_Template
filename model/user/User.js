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


exports.login = function(req, user_name, password) {
        let qb = knex('user').select('*')
        .where({
            "user_name": user_name,
        });

    return qb
        .then((result, err) => {
            if (err) throw err;
            if (result.length < 1) {
                throw {
                    "code": "INVALID_CREDENTIALS",
                    "errno": 1
                }
            }
            let response = {};

            if (bcrypt.compareSync(password, result[0].password)) {
                response.success = true;
                req.session.user_id = result[0].user_id;
                return response;
            }

            response.success = false;
            return response;
        })
        .catch(promiseErrCallback);
};