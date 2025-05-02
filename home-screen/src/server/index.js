const express = require('express');
const cors = require('cors');
const app = express();
const loginRoutes = require('./LoginPage');

app.use(cors());
app.use('/api', loginRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
