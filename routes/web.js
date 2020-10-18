const HomeController=require('../app/http/controller/HomeController')
const AuthController=require('../app/http/controller/AuthController')
const MeetingController=require('../app/http/controller/MeetingController')
//middleware
const guest=require('../app/http/middleware/guest')
const auth =require('../app/http/middleware/auth')

function initRoutes(app){
    //Auth routes
    app.get('/',HomeController().index)
    app.get('/login', guest, AuthController().login)
    app.post('/login',AuthController().postLogin)
    app.get('/register', guest, AuthController().register)
    app.post('/register',AuthController().postRegister)
    app.get('/meeting', auth, MeetingController().index)
    app.post('/meeting', auth, MeetingController().createMeeting)
    app.get('/allmeeting',auth, MeetingController().fetchAll)
    app.put('/viewMeeting/:id', auth, MeetingController().AjaxView)
    app.put('/updateMeeting/:id', auth, MeetingController().AjaxUpdate)
    app.post('/updateMetting',auth, MeetingController().Updated)
    app.delete('/updateMeeting/:id', auth, MeetingController().AjaxDelete)
    app.post('/logout' , AuthController().logout)
}
module.exports=initRoutes