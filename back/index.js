const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const db = require( './models');
const userAPIRouter = require('./routes/user');
const postsAPIRouter = require('./routes/posts');
const postAPIRouter = require('./routes/post');

const app = express();
db.sequelize.sync();

app.use(morgan('dev')); //로깅하는 미들웨어
app.use(express.json());//req.body가 동작하게 만들기 위함
app.use(express.urlencoded({ extended : true})); 
app.use(cors());

app.use('/api/user', userAPIRouter); //routes에 유저 부분 참고
app.use('/api/posts', postsAPIRouter); 
app.use('/api/post', postAPIRouter); 


app.listen(3065, ()=>{
    console.log(`server is ruuning on http://localhost:3065`);
});