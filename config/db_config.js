/*
export db_host=localhost
export db_port=8889
export db_user_name=root
export db_pass=root
export db_name=artis_craigslist




*/


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

console.log("Stuff");
console.log(JSON.stringify(mysqlConfig));

exports.knex = knex;