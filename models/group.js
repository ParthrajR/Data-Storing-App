// const dbConnection = require('./dbConnection'); // Adjust the path accordingly


class Group {
    static create(newGroup, callback) {
        console.log("cscscscscsc", newGroup)
        const query = 'INSERT INTO groupInfo SET ?';
        dbConnection.query(query, newGroup, (error, results) => {
            if (error) {
                console.log(error)
                return callback(error);
            }
            console.log("group created successfully")
            return callback(null, results);
        });
    }
    static getAll(callback) {
        const query = 'SELECT * FROM groupInfo';
        dbConnection.query(query, (error, results) => {
          if (error) {
            return callback(error);
          }
          
          if (results.length === 0) {
            // Handle the case where there are no rows in the result set
            return callback(null, []);
          }
      
          return callback(null, results);
        });
      }
}

module.exports = Group