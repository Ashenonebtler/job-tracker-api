const mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["applied", "interview", "offer", "rejected"],
        default: "applied",
    },
    location: {
        type: String,
    },
    salary: {
        type: Number,
        min: 0,
    },
    appliedDate: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
})

module.exports = mongoose.model("Application", ApplicationSchema)
