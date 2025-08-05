const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    status: {type: String, enum: ['applied', 'interview','offer', 'rejected'], default: 'applied'},
    appliedDate: {type: Date, default: Date.now},
    notes: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Job', JobSchema);

