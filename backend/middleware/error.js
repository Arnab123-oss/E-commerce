import {ErrorHandler} from "../utils/errorhandler.js"

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    //Wrong MongodB ID Error

    if(err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      err = new ErrorHandler(message,400)
    }
  
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };