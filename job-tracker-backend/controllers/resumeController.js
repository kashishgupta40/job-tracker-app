const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

exports.uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:8000/api/resumes/upload/', form, {
      headers: form.getHeaders(),
    });

    res.status(200).json({
      message: 'Resume analyzed successfully',
      analysis: response.data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to analyze resume' });
  }
};
