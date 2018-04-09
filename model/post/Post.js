let knex = require('../../config/db_config.js').knex;
let {promiseErr,promiseErrCallback} = require('../common/ErrorHandler.js');




exports.createPost = function(user_id, post_text) {
        let qb = knex('post').insert({
            "post_id": null,
            "user_id": user_id,
            "post_text": post_text
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

exports.removePost = function(post_id) {
        let qb = knex('post')
        .where({
            "post_id": post_id
        })
        .del();

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

exports.getPosts = function() {
        let qb = knex('post').select('*');

        return qb
        .then( (result, err) => {
            if(err) throw err;
            let response = {};
            response.success = true;
            response.posts = result;
            return response;
        })
        .catch(promiseErrCallback);
};