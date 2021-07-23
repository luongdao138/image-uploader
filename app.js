const express = require('express');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: '*',
  })
);

require('dotenv').config();

const uploadMiddleware = require('./middlewares/upload');
const cloudinary = require('./helpers/cloudinary');
const { format64 } = require('./helpers/convertBase64');

const PORT = process.env.PORT || 5000;

app.post('/upload', uploadMiddleware('single', 'image'), async (req, res) => {
  const uploadFile = req.file;
  if (!uploadFile) return res.status(400).json('No image provided!');

  const { content } = format64(uploadFile);
  const { public_id, secure_url } = await cloudinary(content);

  res.json({ public_id, secure_url });
});

app.listen(PORT, () => {
  console.log('server listening on port 5000!');
});
