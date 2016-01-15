/**
 * Created by thuanle on 1/8/2016.
 */

exports.requiresLogin = function (req, res, next) {
    if(process.env.NODE_ENV !== "test"){
        if (req.isAuthenticated()) return next()
        if (req.method == 'GET') req.session.returnTo = req.originalUrl
        res.redirect('/')
    }
    else{
        req.session.passport.user={"DisplayName":"Test","email":"test@mail.com","password":"123","_id":"NKw86GPKd7mxOAu0"}
        next();
    }


}

exports.redirectToDashBoard=function(req,res,next){
    if(process.env.NODE_ENV !== "test"){
        if (req.isAuthenticated()) return res.redirect('/dashboard');
        else{
            next();
        }
    }
    else{
        req.session.passport.user={"DisplayName":"Test","email":"test@mail.com","password":"123","_id":"NKw86GPKd7mxOAu0"}
        next();
    }
}




