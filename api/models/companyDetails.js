const mongoose = require('mongoose')

const CompDetailSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company_name:String,
    company_address:String,
    company_phone:String,
    company_email:String,
    state: String,
    city:String,
    designation:String,   
    person_name:String
},{
    timestamps:true
})


module.exports = mongoose.model('CompanyDetails', CompDetailSchema )