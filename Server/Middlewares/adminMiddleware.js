module.exports={
    adminMiddleware:(req,res,next)=>{
        if(req.role && req.role ==='admin'){
            next();
        }
        else{
            return res.status(403).json({
                success:false,
                status:403,
                message:"Forbidden!you don't have admin access"
            })
        }

    }
}