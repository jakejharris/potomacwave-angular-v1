import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log('API function called');
    console.log('Request method:', req.method);
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email } = req.body;

    if (!email) {
        console.log('Email not provided');
        return res.status(400).json({ error: 'Email is required' });
    }

    if (req.method === 'POST') {
        const { email } = req.body;
        try {
            console.log('Attempting database connection');
            const connection = await mysql.createConnection({
                host: process.env['TIDB_HOST'],
                port: parseInt(process.env['TIDB_PORT'] || '4000'),
                user: process.env['TIDB_USER'],
                password: process.env['TIDB_PASSWORD'],
                database: process.env['TIDB_DATABASE'],
                ssl: {
                    minVersion: 'TLSv1.2',
                    rejectUnauthorized: true
                }
            });

            console.log('Database connected, executing query');
            await connection.execute(
                'INSERT INTO email_submissions (email, submission_date) VALUES (?, NOW())',
                [email]
            );
            await connection.end();

            console.log('Email saved successfully');
            return res.status(200).json({ success: true, message: 'Email saved successfully' });
        } catch (error: any) {
            console.error('Error saving email:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}