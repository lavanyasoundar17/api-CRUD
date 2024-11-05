//update existing user
const baseURL = "https://jsonplaceholder.typicode.com/users"; // Use this endpoint for creating a user

const updateUser = async (id, userData) => {
    const response = await fetch(`${baseURL}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    // Check if the response is not ok
    if (!response.ok) {
        throw new Error(`Error updating user`);
    }

    const data = await response.json();
    return data;
};

const user = {

    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com"
};

async function viewUpdatedUser(user, user_id) {
    try {
        const updatedUser = await updateUser(user_id, user);
        console.log('User updated:', updatedUser);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack trace:', error.stack);
    }
}
viewUpdatedUser(user, 1);

//deleting user 
const URL = "https://jsonplaceholder.typicode.com/users"; // Use this endpoint for creating a user

const deleteUser = async (user_id) => {
    const response = await fetch(`${URL}/${user_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        
    });

    // Check if the response is not ok
    if (!response.ok) {
        
        throw new Error(`Error deleting user`);
    }

    return `User with ID ${user_id} deleted successfully.`;
};



async function delUser(user_id) {
    try {
        const updatedUser = await deleteUser(user_id);
        console.log('User updated:', updatedUser);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack trace:', error.stack);
    }
}

delUser( 1);


