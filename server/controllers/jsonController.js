const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

const getUsers = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    return user;
};

const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(user => user.email === email);
};

const findUserByUsername = (username) => {
    const users = getUsers();
    return users.find(user => user.username === username);
};

module.exports = {
    getUsers,
    saveUser,
    findUserByEmail,
    findUserByUsername
};
