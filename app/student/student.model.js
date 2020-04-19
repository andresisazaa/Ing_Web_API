const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    document: {
        type: Number,
        required: false
    },
    course: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;