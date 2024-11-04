async function fetchUserData(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const user = await response.json();

        // Populate the form fields
        document.getElementById('user_id').value = user.user_id;
        document.getElementById('username').value = user.user_name;
        document.getElementById('email').value = user.email;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function saveUser(event) {
    event.preventDefault(); // Prevent the default form submission

    const userId = document.getElementById('user_id').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Prepare the request body
    const requestBody = {
        user_name: username,
        email: email,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PATCH', // Update specific fields
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error('Error saving user');

        // Redirect back to index.html after successful save
        alert('User updated successfully'); // Notify user about the success

        // Redirect back to index.html after successful save
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

if (userId) {
    fetchUserData(userId);
}