const jwt=require('jsonwebtoken');

module.exports={
    authmiddleware:async(req,res,next)=>{
        try{
            const authHeader=req.header('Authorization');
            const token=req.header('Authorization')?.replace('Bearer ','');

            const decryptedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log('token:',token)
            console.log('decrpted_token:',decryptedToken)
        if (!token) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Authorization token missing",
        });
      }

            if (decryptedToken && decryptedToken._id){
                req.userId=decryptedToken.id;
                req.role=decryptedToken.role;
                next();
            }
        }
        catch(err){
            return res.status(401).json({
                success:false,
                status:401,
                message:"Unauthorized access",
                error:err.message
            });
        
        }
    }
}