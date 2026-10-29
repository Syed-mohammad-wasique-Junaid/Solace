const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

// console.log(typeof passportLocalMongoose);

/*by default passport-local-mongoose add username and password field 
so no need to define separatly also it add the salt-value to password and gives hased form*/
const userSchema = new Schema({
    email : {
        type : String,
        required : true
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);