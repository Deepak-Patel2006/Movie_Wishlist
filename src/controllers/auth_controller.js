import { register, log_in } from "../services/services_auth.js";

export const signup = async (req, res, next) => {
  try {
    const user = await register(req.body);
    console.log(user);

    res.status(201).json({
      success: true,
      message: "User created successfully, login to list the movies !!!",
      name: user.user.name,
      email: user.user.email,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const loging = await log_in(req.body);
    console.log(loging);

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "session creation failed please login again !!!",
        });
      }

      req.session.userId = loging.user.id;
      req.session.isloggedIn = true;

      res.status(201).json({
        success: true,
        message: "Login successful",
        loging,
        redirectUrl: "/index.html",
      });
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const status = async (req, res) => {
  res.status(200).json({
    isloggedIn: Boolean(req.session?.userId),
  });
};

export const logout = async (req, res) => {
  try {
    if (!req.session.isloggedIn) {
      return res.status(400).json({
        success: false,
        message: "user already logged out !!!",
      });
    }
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }

      res.clearCookie("connect.sid");

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};
