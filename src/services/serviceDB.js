import  movieDB from "../models/movie.js";
import  listDB from "../models/list.js";


export const add_to_wishlist = async (userId, movieId) => {
  const existing = await listDB.findOne({
    userId,
    movieId
  });

  if (existing) {
    return {
      Already_listed: true,
      wishlist: existing
    };
  }

  const wishlist = await listDB.create({
    userId,
    movieId
  });

  return {
    Already_listed: false,
    wishlist
  };
};


export const list_movie = async (data) => {
    const{imdbID,title,year,poster} = data;

    const exist = await movieDB.findOne({ imdbID });
    if(exist){
        return {
          Already_listed: true,
          movie: exist
        };
    }
    const movie = await movieDB.create({
        imdbID,
        title,
        year,
        poster
    });

    return {
        Already_listed: false,
        movie: movie
    };
}


export const remove = async (userId, movieId) => {
    const removing = await listDB.findOneAndDelete({
      userId,
      movieId
    });

    return removing;

};


export const allmovies = async(id)=>{

    const listed = await listDB.find({ userId: id }).populate("movieId");;
    return listed;

}
