
const { createUser, loginUser, getUsersService, deleteUser } = require('../services/user.services');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(`hi controller 1 `)
        // Ensure that all required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        console.log(`hi controller 2 `)
        const result = await createUser({ email, password }, username);

        console.log(`hi controller 3 `)
        if (result.success) {
            res.json({ success: true, message: 'Registration successful' });
            console.log(`hi controller 4 `)
        } else {
            res.status(400).json({ success: false, message: result.message });
            console.log(`hi controller 5 `)
        }
    } catch (error) {
        console.error('Error in register controller:', error); // Log detailed error
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        console.log(`username from the controller ${JSON.stringify(req.body)}`)
        const result = await loginUser({ username, password });
        
        if (result.status === 200) {

            res.cookie('username', username, { httpOnly: true, secure: true,path: '/' });

            res.json({ success: true, message: 'Login successful', user: result.user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        
        res.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteUserController = async(req,res)=>{
    try {

        const username = req.body;

        const deleteResult = await deleteUser(username);

        res.status(200).json({ message: deleteResult.message });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const logoutUserController = async (req, res) => {
    try {
        // Clear cookies for username 
        res.clearCookie('username');

        res.status(200).json({message:'Log out successfully.'})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {register,login, getUsers,deleteUserController,logoutUserController}