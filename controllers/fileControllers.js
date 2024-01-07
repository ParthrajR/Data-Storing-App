const s3Service = require("../config/awsConfig");
const Media = require("../models/mediaModel");
const { formatFileSize, sumFormattedFileSizes,  formatBytes, getConversionFactor} = require("../utils/filesize");
const mime = require('mime-types');

const getFileType = (mimeType) => {
  return mime.extension(mimeType);
};

const uploadFile = async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const mediaArray = [];
    let totalFileSizeBytes = 0;

    const uploadPromises = uploadedFiles.map(async (file) => {
      const detectedFileType = getFileType(file.mimetype);
      console.log("fileeeee, typeee", detectedFileType)
      const fileresult = await s3Service.uploadToS3(file);

      // Get the file size in bytes
      const fileSizeInBytes = file.size;

      // Add the file size to the total
      totalFileSizeBytes += fileSizeInBytes;

      // Format file size
      const formattedFileSize = formatFileSize(fileSizeInBytes);

      
      if(detectedFileType === "png" || detectedFileType === "jpeg" || detectedFileType === "jpg" || detectedFileType === "gif" || detectedFileType === "bmp" || detectedFileType === "tiff" || detectedFileType === "webp"){
        const media = await Media.create({
          fileUrl: fileresult.Location,
          userId: req.userId,
          fileSize: formattedFileSize,
          fileType: "Image"
        });
  
        mediaArray.push(media);
      }
      else if(detectedFileType === "mp4" || detectedFileType === "mpeg" || detectedFileType === "webm" || detectedFileType === "ogg" || detectedFileType === "quicktime" || detectedFileType === "x-msvideo"){
        const media = await Media.create({
          fileUrl: fileresult.Location,
          userId: req.userId,
          fileSize: formattedFileSize,
          fileType: "Video"
        });
  
        mediaArray.push(media);
      }
      else{
        const media = await Media.create({
          fileUrl: fileresult.Location,
          userId: req.userId,
          fileSize: formattedFileSize,
          fileType: "Document"
        });
  
        mediaArray.push(media);
      }

      
    });
    
    await Promise.all(uploadPromises);

    const fileSizeArray = mediaArray.map(({ fileSize }) => fileSize);
     console.log("File Size Array:", fileSizeArray);

     const totalFileSize = sumFormattedFileSizes(fileSizeArray);
      console.log("Total File Size:", totalFileSize);

    // Format total file size
    const formattedTotalFileSize = formatFileSize(totalFileSizeBytes);
    console.log("fileeeeeeee sieeee", totalFileSizeBytes)
    res.status(200).send({
      message: "Files uploaded successfully",
      files: mediaArray,
      totalFileSize: formattedTotalFileSize,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Internal Server Error");
  }
};



const getAllFile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("hellllllll", req.query); 
    const existingUser = await Media.find({ userId: userId, fileType: req.query.fileType });
    res.status(200).send({ files: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { uploadFile, getAllFile };
