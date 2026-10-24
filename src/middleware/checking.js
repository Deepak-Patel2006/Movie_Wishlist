import userDB from "../models/users.js";

export const check_session = async(req,res,next)=>{

  try {

    if (!req.session?.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    const user = await userDB.findById(req.session.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication check failed"
    });
  }

};


