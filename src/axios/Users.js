import axios from 'axios';



export async function registerUser(newUser) {
    const registerUrl = 'http://localhost:4646/api/users/register';

    try{
        console.log('Registering user at axios:', newUser);
        const response = await axios.post(registerUrl, newUser);
        console.log('Registration response:', response.data);
        return response.data;
        
        
    } catch (error) {
        console.error('Registration failed:', error.message);
        throw new Error(`Registration failed: ${error.message}`)
    }
}


export async function loginUser(credentials) {
    const loginUrl = 'http://localhost:4646/api/users/login';

    try {
        const response = await axios.post(loginUrl, credentials, { withCredentials: true });
        console.log('Login response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.message);
        throw new Error(`Login failed: ${error.message}`);
    }
}  

export async function getUserMe() {
    const userUrl = 'http://localhost:4646/api/users/me';

    try {
        const response = await axios.get(userUrl, { withCredentials: true });
        console.log('Fetched current user at axios user me:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current user:', error.message);
        throw new Error(`Failed to fetch current user: ${error.message}`);
    }
}



export async function logoutUser() {
    const logoutUrl = 'http://localhost:4646/api/users/logout';

    try {
        const response = await axios.get(logoutUrl,  { withCredentials: true });
        console.log('User logged out successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.message);
        throw new Error(`Logout failed: ${error.message}`);
    }
}
