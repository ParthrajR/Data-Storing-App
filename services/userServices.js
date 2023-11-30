const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

class UserServices{
    static async registerUser(email, username, password){
        try {
            const createUser = new userModel({email, username, password})
            return await createUser.save()
        } catch (error) {
            throw error;
        }
    };
    static async isExisting(email){
        try {
            return await userModel.findOne({email});
        } catch (error) {
            throw error
        }
    };

    static async getAllUsers() {
        try {
          // Use the User model to fetch all users from the database
          const users = await userModel.find();
      
          // Return the list of users
            return users;
        } catch (error) {
          throw error;
        }
      }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire})
    };

    static async getUserByName(username){
        try {
            console.log("-------userrrr-------", username)
            return await userModel.findOne({username: username}); 
        } catch (error) {
            throw error
        }
    }

}

module.exports = UserServices;