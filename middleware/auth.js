const checkLoginSession = (req, res, next)=>{
    if(req.session.username){
        next(); 
    }
    else{
        res.redirect('/auth/login'); 
    }
}
//check admin session
const checkAdminSession = (res, req, next)=>{
    if(req.session.username && req.session.role == 'admin'){
        next();
    } else{
        res.redirect('/auth/login');
    }
}

const checkMultipleSession = (allowRoles) => (req, res, next) =>{
   if(req.session.username && allowRoles.includes(req.session.role)){
    next();
   } else{
    res.redirect('/auth/login'); 
   }
}


module.exports = {
    checkLoginSession,
    checkAdminSession, 
    checkMultipleSession 
}