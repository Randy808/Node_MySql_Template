var config = require('../config.js');
var knex = config.knex;
var common = require('./common/common.js');

exports.register_seller = function(user_id, stripe_id) {
    let qb = knex('seller').insert({
        user_id: user_id,
        stripe_id: stripe_id
    });

     return qb
     .then( (result, err) => {
        if(err){
            console.log.error(err);
            return {
                success: false
            };
        };
        let response = {};
        response.success = true;
        response.insert_id = result[0];
        //console.log(`response: ${JSON.stringify(response)}`);
        return response;
    })
     .catch( (err) =>{
        console.log(err);
        return {
            success: false
        };
     });

};

exports.is_seller = function(user_id) {
    let qb = knex.select('*').from('seller').where({user_id: user_id});
    
    return qb.then( (result) => {
        if(result.length == 0){
            console.log("User is not a verified seller.");
            return common.generateErrorResponse("User is not a verified seller.");
        }
        return {
            "success": true
        };
    });
};


    
  /*
  SAMPLE RESPONSE
  {
  "token_type": "bearer",
  "stripe_publishable_key": "{PUBLISHABLE_KEY}",
  "scope": "read_write",
  "livemode": false,
  "stripe_user_id": "{ACCOUNT_ID}",
  "refresh_token": "{REFRESH_TOKEN}",
  "access_token": "{ACCESS_TOKEN}"
}
*/

    

});



router.get('/seller', function(req, res, next) {
    let user_id = req.session.user.id;

    StripeService.is_seller(user_id).then( (result) => {
        res.send(result);
    })

});

module.exports = router;