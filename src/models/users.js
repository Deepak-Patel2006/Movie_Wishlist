import mongoose from 'mongoose';

const user_schema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});

const userDB = mongoose.model('userDB',user_schema);
export default userDB;
