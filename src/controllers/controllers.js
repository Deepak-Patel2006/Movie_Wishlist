import{
    call,
    full_call,
    load_call
} from "../services/service_basic.js";
import{
    list_movie,
    allmovies,
    remove,
    add_to_wishlist
} from "../services/serviceDB.js";

// Task controller code start here =>

export const search = async(req,res,next)=>{

    try{

        let data = await call(req.query.title , req.query.page);
        
        console.log("search data hittt !!!!");
        
        if(data.Response === "False"){
            res.status(201).json({
                success: false,
                message: "Movie not found ❌ please chech your name !!!",
            });
        }
        else{
            res.status(201).json({
                success: true,
                message: "Movie found successfully",
                data
            });
        }
        
    }catch(error) {
        next(error);
    }

};

export const icon = async(req,res,next)=>{
    try {
        console.log(req.query.Id);
        console.log("icon hittttt");
        
        let full_data = await full_call(req.query.Id)
        
        res.status(201).json({
            success: true,
            message: "Movie found successfully",
            full_data
        });
        

    } catch(error) {
        next(error);
    }
}


export const load = async(req,res,next)=>{

    try{

        let movie_data = await load_call(req.query.title , req.query.pages);
        
        console.log("search with page hittt !!!!");
        
        if(movie_data.Response === "False"){
            res.status(201).json({
                success: false,
                message: "Movie not found ❌ please chech your name !!!",
            });
        }
        else{
            res.status(201).json({
                success: true,
                message: "Movie found successfully",
                movie_data
            });
        }
        
    }catch(error) {
        next(error);
    }

}

// Database controller code start here =>


export const listing = async (req, res) => {
  try {
    // 1. Movie ko find karo ya create karo
    const save = await list_movie(req.body);

    // 2. Har haal mein current user ki wishlist mein add karne ki koshish karo
    const wishlist = await add_to_wishlist(
      req.user._id,
      save.movie._id
    );

    // 3. Response wishlist ke result ke according do
    if (wishlist.Already_listed) {
      return res.status(200).json({
        success: true,
        message: "Movie is already in your wishlist",
        movie: save.movie
      });
    }

    return res.status(201).json({
      success: true,
      message: save.Already_listed
        ? "Existing movie added to your wishlist"
        : "New movie saved and added to your wishlist",
      movie: save.movie
    });

  } catch (error) {
    console.error("Error listing movie:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Movie is already in your wishlist"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add movie to wishlist"
    });
  }
};


export const removing = async(req,res,next)=>{
    
    try{

        console.log("REMOVE MOVIE CONTROLLER HIT");
        const movieid = req.params.Id;
        const userid = req.user._id;

        const movie = await remove(userid,movieid);
        
        if (!movie) {
            return res.status(404).json({
              success: false,
              message: "Movie not found in your wishlist"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Movie deleted",
            movie
        });

    }catch(error){
        next(error);
    }

}

export const getall = async(req,res)=>{
    console.log("hello from the getall");
    try {

       console.log("Logged-in user ID:", req.user._id);

       const saved = await allmovies(req.user._id);
        
        res.status(200).json({
            success:true,
            message: "Getting all movies successfully",
            movies: saved
        });
        
    } catch (error) {
        console.error("Error getting movies:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get movies"
        });
    }
    

}
