require('dotenv').config()
const express = require('express')
const app=express()
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')
const bodyParser=require('body-parser')
const path = require('path')
const flash=require('express-flash')
const bcrypt=require('bcrypt')
var session = require('express-session')
const MongoDbStore = require('connect-mongo')(session)
const mongoose=require('mongoose')
const passport =require('passport')
const port=process.env.PORT || 3000



//db connection
// const url='mongodb://localhost/jwt_auth'
mongoose.connect(process.env.MONGO_CONNECTION_URL,{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const connection=mongoose.connection

connection.once('open',()=>{
    console.log('Database Connected')
}).catch(error=>{
    console.log(error)
})



//session store
let mongoStore = new MongoDbStore({
    mongooseConnection:connection,
    collection:'session'
})
//session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie : {maxAge:1000 * 60 * 60 * 24}//24 hours
}))
//local stratgi
const passportInit = require('./app/config/passport');
passportInit(passport)
//passport initialise passport

app.use(passport.initialize())
app.use(passport.session())
//Assets
app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res , next) =>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use(bodyParser.json())
app.use(expressLayouts)
app.set('views',path.join(__dirname , '/resources/views'))
app.set('view engine' , 'ejs')


//routes
require('./routes/web')(app)

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})