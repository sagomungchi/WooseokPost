const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField : 'userId',
        passwordField : 'password',
    }, async (userId, password, done)=>{
        try {
            const user = await db.User.findOne({
                where: { userId}
            });
            if(!user){
                return done(null, false, { reason: '존재하지 않는 사용자입니다!' }); //첫번째 인수 서버쪽에러, 성공했을때, 로직상에서 에러일 때
            }
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user);
            }
            return done(null, false, { reason : '비밀번호가 틀립니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};