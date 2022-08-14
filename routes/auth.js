const express = require('express')
const passport = require('passport')
const router = express.Router()

//Auth with Google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//google auth callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard')
})

//logout user

router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if (err) {return next(err)}
        res.redirect('/')
    })
})

module.exports = router