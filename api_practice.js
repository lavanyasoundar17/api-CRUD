//fetch or read
const baseURL = "https://jsonplaceholder.typicode.com/users/1"
const fetchUser = async ()=>{
const response = await fetch (baseURL);
if(!response.ok) throw new Error('error fetching data')
const data = await response.json();
return data;
}
        fetchUser().then((user)=>{
        console.log(user);
        });

//create 
const URL = "https://jsonplaceholder.typicode.com/users"; 
const createUser = async (userData) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) 
    });

    if (!response.ok) throw new Error('Error creating user');

    const data = await response.json();
    return data;
};

const newUser = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com"
};

async function User(newUser) {
    try {
        const createdUser = await createUser(newUser);
        console.log('User created:', createdUser);
    } catch (error) {
        console.error('Error:', error);
    }
}
User(newUser);


//update all data
const b_URL = "https://jsonplaceholder.typicode.com/users"
const fetchUser = async ()=>{
const response = await fetch (b_URL);
if(!response.ok) throw new Error('error fetching data')
const data = await response.json();

 const updatedUsers = data.map(user => {
        user.name = 'Hello'; // Update the name
        return user; // Return the modified user object
    });
    return updatedUsers
}
fetchUser().then((x)=>console.log(x));
