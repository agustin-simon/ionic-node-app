const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 4000); 

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/matches' , require('./routes/match.routes'));
app.use('/api/clubes' , require('./routes/club.routes'));
app.use('/api/users' , require('./routes/user.routes'));
app.use('/api/auth' , require('./routes/auth.routes'));
app.use('/api/tempusers' , require('./routes/tempusers.routes'));

// Static files
 app.use(express.static(path.join(__dirname)))

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});