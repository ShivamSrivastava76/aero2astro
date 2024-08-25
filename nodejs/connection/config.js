"use strict";
const mongoose = require('mongoose');
require('dotenv').config();
function mongoosedb() {
    mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => console.log('Connected!'));
}
module.exports = {
    mongoosedb
};
