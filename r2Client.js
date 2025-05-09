const { S3Client } = require('@aws-sdk/client-s3');

const r2 = new S3Client({
  endpoint: 'https://17cfadb7c9d69ef5dd2ac45c900d0d97.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '63c9941ac41e9f649f9b77d2654c9c4c',
    secretAccessKey: '6ccb1aeb074f40c0f1b6b6c386ba12ae021952757edfcf926ea97b6606a8c8f7',
  },
  region: 'auto',
  forcePathStyle: true, 
});

module.exports = r2;
