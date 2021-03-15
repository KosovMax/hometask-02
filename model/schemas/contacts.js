const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactsSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Set name'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Set email']
    },
    phone:{
        type:String
    },
    features:{
        type:Array,
        set:(data) => (data ? data : [])
    },
    owner:{
       type: SchemaTypes.ObjectId,
       ref: 'auth'
    }
},
{versionKey:false, timestamps: true});

contactsSchema.virtual('id').get(()=>{
    return this._id
})


contactsSchema.plugin(mongoosePaginate)
const Contact = model('contacts', contactsSchema);

module.exports = Contact;