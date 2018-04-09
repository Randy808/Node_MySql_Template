let knex = require('../../config/db_config.js').knex;
let { promiseErr, promiseErrCallback } = require('../common/ErrorHandler.js');
const Comment = require('./Comment.js');

exports.createComment = Comment.createComment;
exports.removeComment = Comment.removeComment;
exports.getPostComments = Comment.getPostComments;