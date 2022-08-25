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
router.get('/', ensureAuth, async (req,res) => {
    try{
        const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean()

        res.render('stories/index', {
            stories, 
        })

    } catch (err){
        console.error(err)
        res.render('error/500')
    }
})

//edit page
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
      const story = await Story.findOne({
        _id: req.params.id,
      }).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/stories')
      } else {
        res.render('stories/edit', {
          story,
        })
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

module.exports = router