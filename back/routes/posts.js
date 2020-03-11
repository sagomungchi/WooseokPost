const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async(req, res, next)=>{
    try {
        const posts = await db.Post.findAll({
            include: [{
                model : db.User,
                attributes: ['id', 'nickname'],
            },{
                model : db.Image,
            }],
            order : [['createdAt', 'DESC']], //DESC 내림차순, ASC 오름차순  (1순위 2순위 가능)
        });
        res.json(posts); //변형하지 않은경우는 그대로 보내줘도 되지만 변형하면 toJSON()을 해줘야함 
    } catch (error) {
        console.error(error);
        next(e)
    }
});

module.exports = router;