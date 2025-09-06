const pool = require('../pool');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const BCRYPT_COST = Number(process.env.BCRYPT_COST || SALT_COUNT);
if (!Number.isInteger(BCRYPT_COST) || BCRYPT_COST < 10) {
  throw new Error('Invalid bcrypt cost');
}



const createUser = async ({ username, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_COST);
        const query = `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING *;
        `;
        const { rows: [user] } = await pool.query(query, [username, hashedPassword]);
        
        // Remove sensitive data before returning
        const { password: _, ...safeUser } = user;
        return safeUser;
    } catch (error) {
        console.error('Error creating user', error);
        
        // Handle duplicate username constraint violation
        if (error.code === '23505' && error.constraint === 'users_username_key') {
            throw new Error('Username already exists');
        }
        
        throw new Error('Failed to create user');
    }
};

async function getUserById(id) {
    try {
        const query = {
            text: 'SELECT id, username FROM users WHERE id = $1',
            values: [id],
        };
        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return null; // No user found with the given ID
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
    return result.rows[0];
};

const getUserByUsername = async (username) => {
    try{
        const query = `
            SELECT * FROM users
            WHERE username=$1;
        `;
        const {rows: [user]} = await pool.query(query, [username]);
        // Handle case when no user is found
        if (!user) {
            return null;
        }
    
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
}

const getUserByUserNameForAuth = async (username) => {
    try {
        const query = `
            SELECT * FROM users
            WHERE username=$1;
        `;
        const { rows: [user] } = await pool.query(query, [username]);

        // Handle case when no user is found
        if (!user) {
            return null;
        }

        // Remove sensitive data before returning
        const { password: _, ...safeUser } = user;
        return safeUser;
    } catch (error) {
        console.error('Error fetching user by username for auth:', error);
        throw error;
    }
};

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
};
