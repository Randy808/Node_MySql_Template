let config = {
	'host':'http://localhost',
	'port': 8080
}

function get(url){
	return fetch(`${config.host}:${config.port}${url}`,{
		'method': 'GET',
		credentials: 'include'
	})
	.then(function(response) {
	    return response.json();
	});
}

function post(url, body){
	body = JSON.stringify(body);
	return fetch(`${config.host}:${config.port}${url}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: body,
		credentials: 'include'
	})
	.then((res) => res.json());
}