let knex = require('../config/db_config.js').knex;



exports.register_user = function(item_name) {
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
