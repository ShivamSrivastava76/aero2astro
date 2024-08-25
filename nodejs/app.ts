const express = require('express');

const app = express();

//DataBase Connection
const db = require('./connection/config');
db.mongoosedb()

const cors = require('cors');
app.use(cors());

// Routes
const pilotRoutes = require('./routes/pilotRoute');
app.use('/pilots', pilotRoutes)


const port = 5000;



app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
