const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', { 
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password must not be word password');
            }
        }
    }
})

const Tasks = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Tasks({
    description: 'rock the sunshine',
})

task.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})

const user = new User({
    name: 'federico',
    email: 'fede@hotmail.com',
    password: 'asdasdad'
})

user.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})