import mongoose from "mongoose"; 

const movieschema = new mongoose.Schema({

    imdbID:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true
    }

});

const movieDB = mongoose.model("movieDB",movieschema);
export default movieDB;

