import mongoose from 'mongoose';

const wishlist = new mongoose.Schema(
  {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDB',
        required:true
    },

    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movieDB',
        required:true
    }
  },
  {
    timestamps:true
  }

);

wishlist.index(
    {userId:1,movieId:1},
    {unique:true}
)

const listDB = mongoose.model('listDB',wishlist);

export default listDB;
