const User = require('../models/user.js');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        })
    }
    catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin =(req,res)=>{
  res.render('users/login')
}

module.exports.login=(req,res)=>{
  req.flash('success','Welcome Back!')
  const returnTo=res.locals.returnTo || '/campgrounds'
  
  res.redirect(returnTo)
}

module.exports.logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}