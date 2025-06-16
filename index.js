
if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express=require('express');
const app=express()
app.set('query parser', 'extended');
const path=require('path')
const ExpressError=require('./utils/ExpressError.js')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/user.js')
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');

const MongoStore = require('connect-mongo');
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const campgrounds=require('./routes/campgrounds.js')
const reviews=require('./routes/reviews.js')
const users=require('./routes/users.js')
const dbUrl=process.env.DB_URL


const store = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/yelp-camp',
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

const sessionConfig={
    store,
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.set('views',path.join(__dirname,'views'))

app.set('view engine','ejs')


app.engine('ejs',ejsMate)

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(sanitizeV5({ replaceWith: '_' }))


app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currUser=req.user;
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})


app.use('/campgrounds',campgrounds)
app.use('/campgrounds/:id/reviews',reviews)
app.use('/',users)



mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>console.log('connected to mongoose'))
.catch(err=>{
    console.log('connection failed')
    console.log(err)
})

app.get('/',(req,res)=>{
    res.render('home');
})

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err,req,res,next)=>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('campgrounds/error', { err })

})

app.listen(3000,(req,res)=>{
    console.log('LISTENING ON PORT 3000')
})

