const express = require('express');
const multer = require('multer');
const {
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  CopyObjectCommand
} = require('@aws-sdk/client-s3');
const r2 = require('../r2Client');
const router = express.Router();
const bucketName = 'jewellery-mp4';
const storage = multer.memoryStorage();
const upload = multer({ storage })


router.post('/upload', upload.array('file', 10), async (req, res) => {
  try {
    for (const file of req.files) {
      const uploadCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await r2.send(uploadCommand);
    }

    res.json({ message: 'Upload successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});


router.get('/files', async (req, res) => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    const data = await r2.send(listCommand);
    res.json(data.Contents || []);
  } catch (err) {
    console.error('Error fetching objects:', err.message);
    res.status(500).json({ error: err.message });
  }
});



router.delete('/delete/:key', async (req, res) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: req.params.key,
    });

    await r2.send(deleteCommand);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/replace/:key', upload.array('file', 1), async (req, res) => {
  try {
    const fileKey = req.params.key;
    const file = req.files[0]; 

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    await r2.send(deleteCommand);


    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: file.originalname, 
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(uploadCommand);

    res.json({ message: 'File replaced successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'File replacement failed' });
  }
});

module.exports = router
