const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    shortId:{
        type: "String",
        required: "true",
        unique: 'true'
    },
    redirectUrl:{
        type: "String",
        required: "true"
    }
},{timestamps: true,});

const Url = mongoose.model('botUrl',urlSchema);

module.exports = Url;