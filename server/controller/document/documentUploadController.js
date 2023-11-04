const multer = require("multer");
const Doc = require("../../model/docModel");
const fs = require("fs");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userFolder = `uploads/${req.user._id}`;
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const uploadFile = upload.single("file");

// Handle file upload
const handleFileUpload = async (req, res) => {
  try {
    // Create a new document entry in the collection
    const doc = new Doc({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedBy: {
        userId: req.user._id,
        name: req.user.name,
      },
      filePath: req.file.filename,
    });

    // Save the document to the collection
    await doc.save();

    res.status(201).send("File uploaded successfully");
  } catch (error) {
    res.status(500).send("Error uploading file");
  }
};

module.exports = {
  uploadFile: handleFileUpload,
};
