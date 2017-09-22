const passport = require('passport');

module.exports = app => {
    /* Kick Off Google Auth Process */
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    /* Complete Google Auth Process */
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/');
        }
    );
};
