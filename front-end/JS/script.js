// Function to fetch and display user data
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const users = await response.json();
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.user_id}</td>
                <td>${user.user_name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="window.location.href='edit.html?user_id=${user.user_id}'">Edit</button>
                    <button onclick="deleteUsers(${user.user_id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


async function deleteUsers(user_id) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${user_id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchUsers(); // Refresh the user list
        } else {
            console.error('Error deleting user:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Load users on page load
window.onload = fetchUsers;
