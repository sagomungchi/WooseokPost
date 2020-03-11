const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');

const router = express.Router();
router.get('/', (req, res) => { //내정보 가져오기
    if(!req.user){ //디시리얼 라이즈 유저가 만들어주는 것
        return res.status(401).send('로그인이 필요합니다');
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});
router.post('/idCheck', async (req, res) => {
    try {
        const exUser = await db.User.findOne({
            where: { //조건
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.json({ existence: true });
        }
        return res.json({ existence: false });
    } catch (error) {
        console.error(error);
        return next(error);  //res.status(403).send(e);
    }
});
router.post('/nicknameCheck', async (req, res) => {
    try {
        const exUser = await db.User.findOne({
            where: { //조건
                nickname: req.body.nickname,
            },
        });
        if (exUser) {
            return res.json({ existence: true });
        }
        return res.json({ existence: false });
    } catch (error) {
        console.error(error);
        return next(error);  //res.status(403).send(e);
    }
});
router.post('/', async (req, res) => {  //회원가입
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12); //salt는 10~13사이
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        return next(error);  //res.status(403).send(e);
    }
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => { //kakago, google 등등 써주면 됨
        if (error) {
            console.error(error);
            return next(error);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginError) => {
            try {
                
                const filteredUser = Object.assign({}, user.toJSON());
                console.log(filteredUser);
                delete filteredUser.password;
                return res.json(filteredUser);
            } catch (error) {
                next(error);
            }
            if (loginError) {
                return next(loginError);
            }

        });
    })(req, res, next);
});

module.exports = router;