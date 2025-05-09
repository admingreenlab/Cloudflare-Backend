const express = require('express');
const cors = require('cors');
const app = express();
const r2Routes = require('./routes/itemRoutes');
const authRoutes = require('./auth');

app.use(cors());
app.use(express.json());
app.use('/r2', r2Routes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
