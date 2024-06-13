const db = require('../infrastructure/db');

const userRepository = {
    findByUsername: function(username, callback) {
        db.get(`SELECT * FROM admins WHERE username = ?`, [username], callback);
    }
};

module.exports = userRepository;
