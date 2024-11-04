document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_name: username, email, password })
        });

        if (response.ok) {
            alert('User created successfully');
            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Error creating user');
    }
});
