import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ejemplots', // Cambia esto si es necesario
    password: 'holamundo', // Asegúrate de que esto sea correcto
    port: 5432,
});

// Rutas
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Error inserting user' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
