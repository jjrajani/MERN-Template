const express = require('express');
const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

/* Models */

/* Connect mongoose to our MongoDB on mLab */
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// );

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        console.log('wtf mother fucker', __dirname);
        res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}
app.get('/', (req, res) => {
    res.send('Hello There Square Clone');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('App listening on PORT 5000');
});
