import express from 'express';
// import bmiRouters from './routes/bmical.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Middleware
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


// Connect to MongoDB
import connectDB from './config/db.js';

const app = express();
connectDB();

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

// Routes 1 from 1st example
// app.get('/product',(req, res)=>{
//     res.send('Hello Endpoint!');
// });

// Routes 2 from 2nd example
// app.use('/api', bmiRouters);

// Routes 3 from 3rd example "Good choice"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โหลด route ทั้งหมดในโฟลเดอร์ routes
const routePath = path.join(__dirname, 'routes');

fs.readdirSync(routePath).forEach((file) => {
  if (file.endsWith('.js')) {
    import(`./routes/${file}`).then((module) => {
      app.use('/api', module.default); // ต้องใช้ .default เพราะใช้ export default
    });
  }
});

app.listen(5000, ()=> console.log('Server is running on port 5000'));