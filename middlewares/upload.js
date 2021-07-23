const multer = require('multer');

const uploadMidlleware = (type, filename) => {
  // type: upload one file or many files
  // filename: name of file
  const ALLOW_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    if (ALLOW_FORMATS.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Not support file type '), false);
  };

  const upload = multer({
    fileFilter,
    storage,
  });

  const uploadCtrl = (req, res, next) => {
    const middleware =
      type === 'single' ? upload.single(filename) : upload.array(filename);

    middleware(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // A multer error occured when uploading
        return res.status(500).json({
          message: 'Multer occur',
        });
      } else if (error) {
        // unknown error occur
        return res.status(500).json({
          message: 'Error occur, cannot upload image',
        });
      }

      console.log('OK');
      // everything went fine
      next();
    });
  };

  return uploadCtrl;
};

module.exports = uploadMidlleware;
