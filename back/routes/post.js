const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', async(req, res,next)=>{
    try {
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId : req.user.id,
        });
        res.json(newPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.post('/images', (req,res)=>{

});

module.exports = router;