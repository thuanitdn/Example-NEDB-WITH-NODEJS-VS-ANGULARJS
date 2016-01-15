/**
 * Created by thuanle on 1/8/2016.
 */
var HomeController=require('./controllers/HomeController.js');
var OauthController=require('./controllers/OAuthController.js');
var DashboardController=require('./controllers/DashboardController.js');
var projectController=require('./controllers/ProjectController.js');
var taskController=require('./controllers/TaskController.js');
var middleware=require('./middleware/Authorization.js');
module.exports=function (app,passport)
{
    /**
     * Route for controllers
     */
    app.get('/',middleware.redirectToDashBoard,HomeController.index);
    app.post('/create-user',HomeController.createUser);
    app.get('/register',OauthController.getRegister);
    app.post('/register',OauthController.postRegister);
    app.get('/login',OauthController.getSignin);
    app.post('/login',passport.authenticate('local', {failureRedirect: '/login',failureFlash: 'Please input correct email and password'}),OauthController.session);
    app.get('/dashboard',middleware.requiresLogin,DashboardController.index);
    app.get('/logout', function (req,res) {
        req.logout();
        res.redirect('/');
    });
    app.post('/api/project/create',middleware.requiresLogin,projectController.create);
    app.get('/api/project/listProject',middleware.requiresLogin,projectController.loadAll);
    app.get('/api/project/remove',middleware.requiresLogin,projectController.remove);
    app.post('/api/project/update',middleware.requiresLogin,projectController.update);
    app.get('/api/project/findByProject',middleware.requiresLogin,projectController.findByProject);
    app.post('/api/task/create',middleware.requiresLogin,taskController.create);
    app.get('/api/task/listTask',middleware.requiresLogin,taskController.loadAll);
    app.get('/api/task/listTaskDone',middleware.requiresLogin,taskController.loadAllTaskDone);
    app.get('/api/task/updateTask',middleware.requiresLogin,taskController.update);
    app.get('/api/task/removeTask',middleware.requiresLogin,taskController.remove);
}