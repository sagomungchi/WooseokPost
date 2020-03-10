const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');

const router = express.Router();
router.get('/', (req, res)=>{ //내정보 가져오기

});
router.post('/idCheck', async(req, res)=>{
    try {
        const exUser = await db.User.findOne({
            where:{ //조건
                userId : req.body.userId,
            },
        });
        if (exUser) {
            return res.json({existence:true});
        }
        return res.json({existence:false});
    } catch (error) {
        console.error(error);
        return next(error);  //res.status(403).send(e);
    }
});
router.post('/nicknameCheck', async(req, res)=>{
    try {
        const exUser = await db.User.findOne({
            where:{ //조건
                nickname : req.body.nickname,
            },
        });
        if (exUser) {
            return res.json({existence:true});
        }
        return res.json({existence:false});
    } catch (error) {
        console.error(error);
        return next(error);  //res.status(403).send(e);
    }
});
router.post('/', async(req, res)=>{  //회원가입
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12); //salt는 10~13사이
        const newUser = await db.User.create({
            nickname : req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        return res.status(200).json({success:true});

    } catch (error) {
        console.error(error);
        return next(error);  //res.status(403).send(e);
    }
});

router.post('/logout', (req, res)=>{

});
router.post('/login', (req, res)=>{

});

module.exports = router;