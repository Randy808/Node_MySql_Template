class UserAPI{

	constructor(){}
	static login(){
		let user_name = document.getElementById("user_name").value;
		let password = document.getElementById("password").value;
		let body = {
			"user_name": user_name,
			"password": password
		};
		debugger;
		return post('/api/login', body).then( (r) => {
			document.getElementById('response').innerHTML = JSON.stringify(r);
		});
	}

	static register(){
		let user_name = document.getElementById("user_name").value;
		let password = document.getElementById("password").value;
		let email = document.getElementById("email").value;
		let body = {
			"user_name": user_name,
			"email": email,
			"password": password
		};
		debugger;
		return post('/api/register', body).then( (r) => {
			document.getElementById('response').innerHTML = JSON.stringify(r);
		});
	}

}