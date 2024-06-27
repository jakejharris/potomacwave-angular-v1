const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env['TIDB_HOST'],
  port: parseInt(process.env['TIDB_PORT'] || '4000'),
  user: process.env['TIDB_USER'],
  password: process.env['TIDB_PASSWORD'],
  database: process.env['TIDB_DATABASE'],
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};

app.post('/api/save-email', async (req:any, res:any) => {
  const { email } = req.body;
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO email_submissions (email, submission_date) VALUES (?, NOW())',
      [email]
    );
    await connection.end();
    res.json({ success: true, message: 'Email saved successfully' });
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ success: false, message: 'Error saving email' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});