const express = require('express');
const cors = require('cors');
const db = require('./db');

const clientRoutes = require('./routes/clientRoutes');
const practiceRoutes = require('./routes/practiceRoutes');

const app = express()

app.use(cors())
app.use(express.json())

app.use('/clienti', clientRoutes)
app.use(practiceRoutes);

app.listen(5000, () => {
    console.log("Server avviato su http://localhost:5000")
})