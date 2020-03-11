const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../models');

router.post('/', async (req, res, next) => {
    try {
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        
        if(req.body.image){ //이미지 주소를 여러개 올리면 image : [주소1, 주소2]
            if ( Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((v)=>{
                    return db.Image.create({src : image});
                }))
                await newPost.addImages(images);
            }else{ //이미지를 하나만 올리면 image: 주소1
                const image = await db.Image.create({ src: req.body.image });
                await newPost.addImage(image);
            }
        }

        const fullPost = await db.Post.findOne({
            where: {id:newPost.id},
            include: [{
                model: db.User,
            },{
                model: db.Image,
            }],
        })

        res.json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

const upload = multer({ 
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext)//조우석.png, ext===.png, basename===조우석
            done(null, basename + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, //20MB 제한
});

router.post('/images', upload.array('file'), (req, res) => { //single , array , none 등이 있음 'image는 프런트와 맞춰줘야함'
    res.json(req.files.map(v => v.filename))
});


module.exports = router;