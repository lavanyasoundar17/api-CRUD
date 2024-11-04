const express = require('express');
const { Pool } = require('pg'); //This imports the Pool class from the pg (PostgreSQL) module ..Pool class is used to manage multiple database connections
const cors = require('cors'); 
const connection = new Pool();

const app = express();
const port = 3000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
  const { user_name, email, password } = req.body;

  if (!user_name || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const result = await connection.query(
      'INSERT INTO user_table (user_name, email, password) VALUES ($1, $2, $3)',
      [user_name, email, password]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get
app.get('/api/users',(req,res)=>{
    connection.query('SELECT * FROM user_table',(err,result)=>{
            res.json(result.rows); //The .rows property is an array that holds the actual rows returned by the query because result has various properties like rows,metadataetc..
    });
})
app.get('/api/users/:user_id',(req,res)=>{
    const {user_id}=req.params;
    connection.query('SELECT * FROM user_table WHERE user_id=$1',[user_id],(err,result)=>{
        if(err) throw err;
        if(result.rows.length===0) return res.status(404).json({error:"User not found"})
        res.json(result.rows[0])
    })
})

//update user
app.put('/api/users/:user_id',(req,res)=>{
    const {user_id}=req.params;
    const{user_name,email,password}=req.body;
    if(!user_name ||!email ||!password) {
        res.status(400).json({error: 'All fields are required'});
    }
    connection.query('UPDATE user_table SET user_name=$1, email=$2, password=$3 WHERE user_id=$4',[user_name,email,password,user_id],(err,result)=>{
        if(err) throw err;
        if(result.rowCount===0) return res.status(404).json({error:"User not found"})
        res.status(200).json({message:"User updated successfully"})
    })
})

app.patch('/api/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    const { user_name } = req.body;

    // Validate input
    if (!user_name) {
        return res.status(400).json({ msg: 'Bad request' });
    }
    connection.query(
        'UPDATE user_table SET user_name = $1 WHERE user_id = $2',
        [user_name, user_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User updated successfully' });
        }
    );
});

//delete
app.delete('/api/users/:user_id',(req,res)=>{
    const {user_id}=req.params;
    connection.query('DELETE FROM user_table WHERE user_id=$1',[user_id],(err,result)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    })
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});