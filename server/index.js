import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()

const secretKey = process.env.JWT_SECRET; 

const app = express();

app.use(cors({
    origin: `${process.env.HOST}:${process.env.CORS_ORIGIN}`,
    credentials: true 
}));

const users = [
    { username: 'player1', password: 'player1' },
    { username: 'player2', password: 'player2' }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  });


app.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile('data.json', 'utf8');
        res.status(200).json(JSON.parse(data));
    } catch (err) {
        console.error('File read error:', err);  
        res.status(500).json({ message: 'Error reading the file', error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});
