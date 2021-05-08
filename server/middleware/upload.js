const multer = require("multer");

// configure uploaded files
exports.fileUpload = multer({
  limits: {
    // limit to 1MB
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    const fileName = file.originalname.toLowerCase();
    if (!fileName.endsWith(".png" || ".jpg" || ".gif")) {
      return callback(new Error("file must be .png/.jpg/.gif format"));
    }
    return callback(undefined, true);

    // callback(undefined, false);
  },
});
