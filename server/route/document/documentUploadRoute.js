const express = require('express');
const multer = require('multer');
const path = require('path');
const { checkLogin } = require('../../middleware/token/checkLogin');
const documentUploadController = require("../../controller/document/documentUploadController");
const router = express.Router();
const fs = require('fs');

// Set up the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Get the user ID from the URL parameters
    const userId = req.params.userId;

    // Define the upload folder based on the user ID
    const uploadPath = path.join(__dirname, 'uploads', userId);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Get the user ID from the URL parameters
    const userId = req.params.userId;

    // Generate the filename as userId_time_originalname
    const timestamp = Date.now();
    const originalname = file.originalname;
    const filename = `${userId}_${timestamp}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Define the file upload route with userId as a parameter
router.put('/upload/:userId', upload.single('file'), checkLogin, documentUploadController.uploadFile);

module.exports = router;
