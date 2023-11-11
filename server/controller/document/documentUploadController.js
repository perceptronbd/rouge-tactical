const Doc = require('../../model/docModel');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

exports.uploadFile = async (req, res) => {
  try {
    // Access the uploaded file information
    const { filename, originalname, mimetype, size } = req.file;

    // Access the user's ID from the URL parameters
    const userId = req.params.userId; // Assuming you have a URL parameter named userId

    // Define the upload folder based on the user ID
    const uploadPath = path.join(__dirname, '../../uploads/employee/', userId);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Define the full file path, including the 'uploads' folder and user-specific folder
    const fullFilePath = path.join(uploadPath, filename);

    // Check if a file with the same originalname already exists in the 'userId' folder
    const filesInFolder = fs.readdirSync(uploadPath);
    const fileWithSameName = filesInFolder.find(file => {
      const existingFilename = path.join(uploadPath, file);
      return fs.existsSync(existingFilename) && file === filename;
    });

    if (fileWithSameName) {
      // If a file with the same originalname exists, remove it
      const filePathToRemove = path.join(uploadPath, fileWithSameName);
      fs.unlinkSync(filePathToRemove);
    }

    // Move the uploaded file to the correct location
    fs.renameSync(req.file.path, fullFilePath);

    // Create a new document in the database with the correct 'filePath'
    const newDoc = new Doc({
      originalname,
      mimetype,
      size,
      uploadedBy: {
        user: userId,
      },
      filePath: fullFilePath, 
    });

    await newDoc.save();

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
