const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmSchema = new Schema ({
    name: {
        type: String,
        required: true
    }
    // address: {
    //     type: String,
    //     required: true
    // },
    // location: {
    //     type: [Number]
    // },
    // openinghours: {
    //     type: String
    // },
    // fields: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Field'
    // }]
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;