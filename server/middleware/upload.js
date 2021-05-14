const multer = require("multer");

// configure uploaded files
const fileUpload = multer({
  limits: {
    // limit to 1MB
    fileSize: 3000000,
  },
  fileFilter(req, file, callback) {
    const fileName = file.originalname;
    // console.log("fileName", fileName);
    if (!fileName.match(/\.(jpg|jpeg|png)$/i)) {
      return callback(new Error("file must be .png/.jpg/.gif format"));
    }
    return callback(undefined, true);

    // callback(undefined, false);
  },
});
module.exports = fileUpload;
