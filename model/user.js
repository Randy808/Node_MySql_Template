let knex = require('../config/db_config.js').knex;



exports.register_user = function(user_name, password, email) {
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
        .catch( (err) => {
            return {
                success: false,
                error: {
                    code: err.code,
                    errno: err.errno
                }
            };
        });
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
                    "code": "INVALID_CRED",
                    "errno": 1
                }
            }
            let response = {};
            response.success = true;
            return response;
        })
        .catch( (err) => {
            return {
                success: false,
                error: {
                    code: err.code,
                    errno: err.errno
                }
            };
        });
};
