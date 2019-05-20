const multer = require('multer');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, uidgen.generateSync() + file.originalname);//Date.now()
    }
  })
  const upload = multer({
    storage: storage
  });

  module.exports = upload;