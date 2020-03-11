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
app.use('/' , express.static('uploads')) ; //이미지 업로드를 위함 (앞의 주소는 프런트가 접근하는 주소)
app.use(express.json());//req.body가 동작하게 만들기 위함
app.use(express.urlencoded({ extended : true})); 
app.use(cors({
    origin : true, //요청 주소와 같게 해주는 것
    credentials : true, //쿠키 서로 교환 되게 하는 서버 설정 (cors와 axios에서 둘다 설정 해줘야 함)
})); 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, //암호화를 위함
    cookie: {
        httpOnly: true, //자바스크립트로 쿠키에 접근 못하게 함
        secure: false, //https를 쓸 때 true
    },
    name : 'sprint', //connect.sid를 숨기기 위함 express는 기본적으로 알려주기때문에 의미없는 이름으로 바꿔줘야함
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter); //routes에 유저 부분 참고
app.use('/api/posts', postsAPIRouter); 
app.use('/api/post', postAPIRouter); 


app.listen(3065, ()=>{
    console.log(`server is ruuning on http://localhost:3065`);
});