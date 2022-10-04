const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    }
},{
    // to keep track of created and updated of the DB
    //and mongoose manages it by below code 
    timestamps: true
});

//below code will tells the mongoose that userschema is a model 
const User = mongoose.model('User', userSchema);

module.exports = User;