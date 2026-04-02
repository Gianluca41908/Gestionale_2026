const express = require('express');
const cors = require('cors');
const db = require('./db');

const clientRoutes = require('./routes/clientRoutes');
const practiceRoutes = require('./routes/practiceRoutes');

const app = express()

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/clienti', clientRoutes)
app.use(practiceRoutes);

// app.listen(5000, () => {
//     console.log("Server avviato su http://localhost:5000")
// })

app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});