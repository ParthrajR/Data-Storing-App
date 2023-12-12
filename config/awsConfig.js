const AWS = require("aws-sdk");
const uuid = require("uuid").v4;


AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const s3 = new AWS.S3();

const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_SELF_BUCKET_NAME,
    Key: `uploads/${uuid()}_${file.originalname}`, // Include UUID in the key
    Body: file.buffer,
  };

  return await s3.upload(params).promise();
};

module.exports = { uploadToS3 };
