const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const scanRoutes = require('./routes/scan');
const compatibilityRoutes = require('./routes/compatibility');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pcChecker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/scan', scanRoutes);
app.use('/api/compatibility', compatibilityRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
