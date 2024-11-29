const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const citationRoutes = require('./routes/citationRoutes');
const versionRoutes = require('./routes/versionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
}));

app.use(express.json());

app.use('/api/user',authRoutes);
app.use('/api/documents',documentRoutes);
app.use('/api/citations',citationRoutes);
app.use('/api/versions',versionRoutes);
app.use('/api/reviews',reviewRoutes);

const PORT = process.env.PORT|| 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));