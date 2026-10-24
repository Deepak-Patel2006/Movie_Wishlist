import  userDB from "../models/users.js";
import bcrypt from "bcrypt";

export const register = async(data)=>{

    const{name, email, password} = data;

    const check = await userDB.findOne({ email });
    if(check){
        throw new Error(" Email already in use !!!");
    }

    const hashed = await bcrypt.hash(password,10);
    const user = await userDB.create({
        name,
        email,
        password:hashed,
    });
    return{
        message:'user created successfully !!!',
        exist:false,
        user
    }

}

export const log_in = async(data)=>{

    const {email,password} = data;

    const user = await userDB.findOne({email});

    if(!user){

        throw new Error("User not found or incorrect email !!!");

    }

    const check_password = await bcrypt.compare(
        password,
        user.password
    );

    if(!check_password){

        throw new Error("Incorrect password enter the correct password !!!");
        
    }

    return{
        message:`Welcome back ${user.name} `,
        success:true,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        }
    };

};

