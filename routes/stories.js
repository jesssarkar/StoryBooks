const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Story = require('../models/Story')

//Show add page
router.get('/add', ensureAuth, (req,res) => {
    res.render('stories/add')
})

//process add form
router.post('/', ensureAuth, async (req,res) => {
    try{
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error){
        console.error(err)
        res.render('error/500')
    }
})

//show all storied
router.get('/stories', ensureAuth, async (req,res) => {
    try{
        const stories = await Story.find({status: 'public'}).populate('user')

    } catch (err){
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router