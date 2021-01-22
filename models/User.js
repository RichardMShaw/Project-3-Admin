const {model,Schema} = require('mongoose')

const UserSchema = new Schema({
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  username :{
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type:String,
    unique: true,
    require: true
  },
  createAt: {type: Date, default: Date.now}
})

UserSchema.plugin(require('passport-local-mongoose'))

module.exports = model('user',UserSchema)