const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require( './models');
const userAPIRouter = require('./routes/user');
const postsAPIRouter = require('./routes/posts');
const postAPIRouter = require('./routes/post');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev')); //로깅하는 미들웨어
app.use(express.json());//req.body가 동작하게 만들기 위함
app.use(express.urlencoded({ extended : true})); 
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, //암호화를 위함
    cookie: {
        httpOnly: true, //자바스크립트로 쿠키에 접근 못하게 함
        secure: false, //https를 쓸 때 true
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter); //routes에 유저 부분 참고
app.use('/api/posts', postsAPIRouter); 
app.use('/api/post', postAPIRouter); 


app.listen(3065, ()=>{
    console.log(`server is ruuning on http://localhost:3065`);
});