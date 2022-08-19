const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Story = require('../models/Story')

//Show add page
router.get('/add', ensureAuth, (req,res) => {
    res.render('stories/add')
})



module.exports = router