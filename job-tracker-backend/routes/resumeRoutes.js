const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadResume } = require('../controllers/resumeController');

router.post('/upload', upload.single('file'), uploadResume);

module.exports = router;
