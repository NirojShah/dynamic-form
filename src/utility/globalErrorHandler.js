const globalErrorHandler = async(error,req,res,next)=>{
    console.log(error)
    return res.status(500).json({
        success:"failed",
        message: error.message
    })
}

export default globalErrorHandler;