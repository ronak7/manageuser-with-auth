const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserScheema = mongoose.Schema({
    firstname: {
        trim: true,
        type: String
    },
    lastname: {
        trim: true,
        type: String
    },
    image: {
        trim: true,
        type: String
    },
    email: {
        trim: true,
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Boolean,
        default: 1
    },
    token: {
        type: String
    }
})

UserScheema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

module.exports = mongoose.model('users', UserScheema)