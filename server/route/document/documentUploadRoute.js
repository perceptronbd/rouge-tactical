const express = require("express");
const router = express.Router();
const { checkLogin } = require("../../middleware/token/checkLogin");

const documentUploadController = require("../../controller/document/documentUploadController");

router.put("/upload",checkLogin, documentUploadController.uploadFile);

module.exports = router;
