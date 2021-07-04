const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema(
  {

    Email: {type: String, required: true, trim: true},
    Password: { type: String, required: true },
    RepeatPassword: { type: String, required: true },
    RememberMe: {type: Boolean}
    
    


  }, { timestamps: true }
);
UserSchema.plugin(uniqueValidator);
const user = mongoose.model("Staff", UserSchema);
module.exports = user;