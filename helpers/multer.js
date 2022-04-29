const multer = require('multer');
const path = require('path')

const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))

  }
});


const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
     }
    cb(undefined, true)
}
}).single('profile')

module.exports = { upload }