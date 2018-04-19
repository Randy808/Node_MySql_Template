//Each will get 200 err codes
/*
RepoErrors will be 0 - 199
ServiceErrors will be 200 - 399
	//split among 12 categories
	//offset of 200 can be put in controllers
	//1 - 16 is product
ControllerErrors will be 400 - 599
*/
//MYSQL ERR CODES 1k to 2k

exports.promiseErr = function(err) {

	//resolve this
	/*
	{
		"success": false,
		"err": {
			"code": code,
			"message": serviceErrorMessages[code]
		}
	}
	*/
	return new Promise((resolve, reject) => {
		resolve(err);
	});
};


let promiseErrCallback = (err) => {
	cosnole.log("callback called");
    return {
        success: false,
        error: {
            code: err.code,
            errno: err.errno
        }
    };
};