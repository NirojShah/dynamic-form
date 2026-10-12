const globalErrorHandler = async (error, req, res, _next) => {
  return res.status(500).json({
    success: "failed",
    message: error.message,
  });
};

export default globalErrorHandler;
