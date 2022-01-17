const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,'config/user');
    },
    filename:(req,file,callback) =>{
        const ext = file.mimetype.split('/')[1];
        callback(null,`image-${Date.now()}.${ext}`)
    }
});

const isImage = (req,file,callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }else{
        callback(new Error('You Can Only Upload Image File'));
    }
};

const upload = multer({
    storage:multerConfig,
    fileFilter:isImage
});

exports.uploadImage = upload.single('photo');

exports.upload =(req,res)=>{

    res.status(200).json({
        success:'Success'
    });
}
