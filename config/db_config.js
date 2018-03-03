let mysqlConfig = {
	host: process.env.db_host,
	port: parseInt(process.env.db_port),
	user : process.env.db_user_name,
	password : process.env.db_pass,
	database : process.env.db_name,
}

var knex = require('knex')({
  client: 'mysql',
  connection: mysqlConfig
});

exports.knex = knex;