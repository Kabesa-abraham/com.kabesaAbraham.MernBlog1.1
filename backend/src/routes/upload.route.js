const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors')


const router = express();
router.use(cors())

//configuration de multer pour enregistrer les images dans le dossier upload/images
const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:Storage});

//route d'upload image
router.post('/upload_image', upload.single('image'), (req,res) =>{
    res.json({
        success:1,
        image_url:`http://localhost:${3000}/images/${req.file.filename}`,
    })
})

module.exports = router;