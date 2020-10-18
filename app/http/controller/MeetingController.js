const Meeting=require('../../model/Meeting')
const moment = require('moment')
const User = require('../../model/User')
function MeetingCotroller() { 
    return{
        index(req,res){
            res.render('user/createMeeting')
        },
        createMeeting(req,res){
            
            const {meetingName,startTime,endTime,createDate,description}=req.body
            if(!meetingName || !startTime || !endTime || !createDate || !description){
                req.flash('error','All fields required!')
                req.flash('meetingName',meetingName)
                req.flash('startTime',startTime)
                return res.redirect('/meeting')
            }
            const timeStart=new Date(startTime).getHours()
            const timeEnd=new Date(endTime).getHours()
            const meeting=new Meeting({
                userId:req.user._id,
                meetingName:meetingName,
                startTime:timeStart,
                endTime:timeEnd,
                createDate:createDate,
                description:description
            })
            meeting.save().then((result)=>{
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
                return res.redirect('/meeting')
            }).catch(error=>{
                console.log(error)
            })

            console.log(req.body)
            res.status(200).json({
                meeting:req.body
            })
        },
        async fetchAll(req,res){
            const meeting=await Meeting.find({userId: req.user._id },null,
                {sort:{'createdAt':-1}})
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            return res.render('user/allmeeting',{meeting:meeting,moment:moment})
        },
        async AjaxView(req,res){
            let id = req.params.id;
            console.log("id=>",id);
            if(!id){
                req.flash('error','Something error')
            }
            const data=await Meeting.findOne({_id:id,moment:moment},(err,response)=>{
                res.json(response);
            })
            console.log(data)
      
        },
        async AjaxUpdate(req,res){
            let id=req.params.id
            console.log("Id for Update=",id)
            if(!id){
                req.flash('error','Something error')
            }
            const data=await Meeting.findOne({_id:id,moment:moment},(err,response)=>{
                res.json(response);
            })
            console.log(data)
        },
        async Updated(req,res){
            const {meetingName,startTime,endTime,createDate,description}=req.body
            if(!meetingName || !startTime || !endTime || !createDate || !description){
                req.flash('error','All fields required!')
                req.flash('meetingName',meetingName)
                req.flash('startTime',startTime)
                return res.redirect('user/allmeeting')
            }
            let newValue={
                $set: { 
                    userId:req.user._id,
                    meetingName:meetingName,
                    startTime:timeStart,
                    endTime:timeEnd,
                    createDate:createDate,
                    description:description
                    } 
                };
            await Meeting.updateOne(newValue, (err, res)=>{
                if (err) throw err;
                console.log("1 document updated");
            })
        },
        async AjaxDelete(req,res){
            var id = req.params.id;
            console.log("id"+id);
            await Meeting.findOneAndRemove({'_id' : id}, (err,response)=>{
                res.json({
                    Success:'Item Delete Successfully.!'
                })
            });
            res.send("Success");
        }
    }
}

module.exports=MeetingCotroller