const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Hello, server');
});

app.listen(3065, ()=>{
    console.log(`server is ruuning on http://localhost:3065`);
});