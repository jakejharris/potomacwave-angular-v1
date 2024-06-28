import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import cors from 'cors';
const corsHandler = cors();

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//     res.json({ message: 'Function reached' });
//     return;
// }

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await corsHandler(req, res, async () => {
        console.log('Request received', req.method);

        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method Not Allowed' });
            return;
        }

        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        if (req.method === 'POST') {
            console.log('POST request received');
            try {
                const connection = await mysql.createConnection({
                    host: process.env['TIDB_HOST'],
                    port: parseInt(process.env['TIDB_PORT'] || '4000'),
                    user: process.env['TIDB_USER'],
                    password: process.env['TIDB_PASSWORD'],
                    database: process.env['TIDB_DATABASE'],
                    ssl: {
                        minVersion: 'TLSv1.2',
                        rejectUnauthorized: true,
                    },
                });

                try {
                    await connection.execute(
                        'INSERT INTO email_submissions (email, submission_date) VALUES (?, NOW())',
                        [email]
                    );
                    res.status(200).json({ success: true, message: 'Email saved successfully' });
                } catch (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                } finally {
                    await connection.end();
                }
            } catch (error) {
                console.error('Error connecting to the database:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
}