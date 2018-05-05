const keys = require('../config/keys');
//per documentation, pass in key
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            //confirm or declare actual amount to charge, up to authorized amount from frontend
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            //token id
            source: req.body.id
        });
        //get current user model
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};