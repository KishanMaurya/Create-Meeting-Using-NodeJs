const Meeting=require('../../model/Meeting')
const moment = require('moment')
function HomeController(){
    return{
        async index(req,res){
            const meeting=await Meeting.find()
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            return res.render('home',{meeting:meeting,moment:moment})
        }
    }
}
module.exports=HomeController