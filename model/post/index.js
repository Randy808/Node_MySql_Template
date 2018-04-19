let knex = require('../../config/db_config.js').knex;
let { promiseErr, promiseErrCallback } = require('../common/ErrorHandler.js');
const bcrypt = require('bcrypt');
const Post = require('./Post.js');



exports.createPost = Post.createPost;
exports.removePost = Post.removePost;
exports.getPosts = Post.getPosts;
