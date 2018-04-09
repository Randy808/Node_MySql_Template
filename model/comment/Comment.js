let knex = require('../../config/db_config.js').knex;
let {promiseErr,promiseErrCallback} = require('../common/ErrorHandler.js');




exports.createComment = function(user_id, post_id, comment_text) {
        let qb = knex('comment').insert({
            "comment_id": null,
            "user_id": user_id,
            "post_id": post_id,
            "comment_text": comment_text
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

exports.removeComment = function(comment_id) {
        let qb = knex('comment')
        .where({
            "comment_id": comment_id
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

exports.getPostComments = function(post_id) {
        let qb = knex('comment').select('*')
        .where({
            post_id: post_id
        });

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