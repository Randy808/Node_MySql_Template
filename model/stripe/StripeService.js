
var StripeRepository = require('./Stripe');


exports.register_seller = function(user_id, stripe_id){
    //verify stripe id with some stripe api here also, so not anyone can post whatever they like

    return new Promise( (resolve, reject) =>{
        console.log(`user_id: ${user_id} \nstripe_id: ${stripe_id}`);
        if(stripe_id == ""){
            console.log("Stripe account could not be registered. Unabled to generate a Stripe ID");
            resolve({
                success: false,
                error_message: "Stripe account could not be registered. Unable to generate a Stripe_ID"
            });
        }
        else if(!user_id){
            console.log("Stripe account could not be registered. User Id is invalid.");
            resolve({
                success: false,
                error_message: "Stripe account could not be registered. User Id is invalid."
            });
        }
        resolve(StripeRepository.register_seller(user_id, stripe_id));

    });
};

exports.is_seller = function(user_id){
    //verify stripe id with some stripe api here also, so not anyone can post whatever they like

    return new Promise( (resolve, reject) =>{
        if(!user_id){
            console.log("Stripte account could not be registered. User Id is invalid.");
            resolve({
                success: false,
                error_message: "Stripe account could not be registered. User Id is invalid."
            });
        }
        resolve(StripeRepository.is_seller(user_id));
    });
};


/*
var express = require('express');
var router = express.Router();
var stripe = require("stripe")("STRIPE_ID");


var StripeService = require('../services/StripeService.js');
var fetch = require('node-fetch');



router.get('/register', function(req, res, next) {

  //fix this https://stripe.com/docs/connect/standard-accounts#token-request
    console.log("\n\nStripe register endpoint reached\n\n");
    let code = req.query.code != undefined ? req.query.code : "";
  let user_id = req.session.user.id;
  
  let body = {
    "client_secret": "CLIENT_SECRET",
    "code": code,
    "grant_type": "authorization_code"
   };

  fetch('https://connect.stripe.com/oauth/token',{
    method:"POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then( (stripeResponse) => {
    return stripeResponse.json();
  })
  .then ( (stripeCredentials) => {
    StripeService.register_seller(user_id,stripeCredentials.stripe_user_id).then( (result) => {
      res.render("sellerRegistered.ejs",{"user": req.session.user, "response": result, "showSuccess": showSuccess});
    })
  });

  */