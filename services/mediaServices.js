const mediaModel = require("../models/mediaModel");

class mediaServices {
  static async uploadFile(mediaInfo) {
    try {
      console.log("----------mediaInfo in services----------", mediaInfo[0]);
      const uploadFiles = new mediaModel(mediaInfo[0]); // Remove the extra object layer
      console.log("--------cscscsc-------", uploadFiles);
      return await uploadFiles.save();
    } catch (error) {
      throw error;
    }
  }
  static async getAllFiles(createdAt) {
    try {
      // Use the User model to fetch all users from the database
      console.log(createdAt)
      const files = await mediaModel.find()
      return files;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = mediaServices;
