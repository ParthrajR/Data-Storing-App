const s3Service = require("../config/awsConfig");
const Media = require("../models/mediaModel");


const uploadFile = async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const mediaArray = []; // Create an array to store media objects

    const uploadPromises = uploadedFiles.map(async (file) => {
      const fileresult = await s3Service.uploadToS3(file);
      console.log(req.userId)
      const media = await Media.create({
        fileUrl: fileresult.Location,
        userId: req.userId,
      })
      mediaArray.push(media);
    });
    await Promise.all(uploadPromises);

    res.status(200).send({message: "Files uploaded successfully", file: mediaArray});
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllFile = async (req, res) => {
  try {
    const userId = req.userId
    const existingUser = await Media.find({userId: userId})
    res.status(200).send({files: existingUser});


  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong"})
  }
}
module.exports = { uploadFile, getAllFile };

