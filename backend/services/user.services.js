const { query } = require("../database/db");

const createUser = async (data, username) => {
    try {
        console.log(`hi service 1 `)
        const { email, password } = data;

        // Check if the email already exists
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);

        console.log(`hi service  2 `)
        if (existingUser.length > 0) {
            return { success: false, message: 'Email already in use' };
        }

        // Insert the new user into the database
        await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

        console.log(`hi service 3 `)
        return { success: true };
    } catch (error) {
        console.error('Error in createUser service:', error); // Log detailed error
        return { success: false, message: 'Error registering user' };
    }
};




const loginUser = async (data) => {
    const { username, password } = data;

    try {
        // SQL query to verify user credentials
        let loginsql = `SELECT * FROM users WHERE username = ? AND password = ?`;

        // Execute the query
        const result = await query(loginsql, [username, password]);

        // If user is found, return success response
        if (result.length) {
            return { status: 200, message: "Successful", user: result[0] };
        } else {
            return { status: 401, message: "Invalid username or password" };
        }
    } catch (error) {
        // Handle database errors
        throw new Error(error);
    }
};



const getUsersService = async (req, res) => {
    try {
        const result = await query('SELECT email, username, password FROM users');
        return result;
    } catch (error) {
        throw new Error('Database error');
    }
};


const deleteUser = async (username) => {
    try {

        const existingUser = await query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            const result = await query("DELETE FROM users WHERE username = ?", [username]);

            if (result)
                return { message: 'User deleted successfully' };
        } else {
            return { message: `User with username:  ${username} not found` };
        }

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = { createUser, loginUser, getUsersService, deleteUser };
