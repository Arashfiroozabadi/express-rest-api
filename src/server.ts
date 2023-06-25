import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3333;

console.log(`server running on port ${PORT}`);
app.listen(PORT);
