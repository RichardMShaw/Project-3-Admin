require('dotenv').config()
const express = require('express')
const { join } = require('path')

const app = express()

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const passport = require('passport')
const {User} = require('./models')
const LocalStragety = require('passport-local').Strategy
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStragety(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, (jwtPayLoad, cb)=>User.findById(jwtPayLoad.id)
.then(user=>cb(null,user))
.catch(err=>cb(err))
))
app.use(require('./routes'))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
})

require('./db')
  .then(() => app.listen(process.env.PORT || 3001))
  .catch((err) => console.log(err))
