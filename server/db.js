import 'dotenv/config';
import * as mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

const coll_Users_Schema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email']
    }
  }, { timestamps: true });  // Adds createdAt/updatedAt

coll_Users_Schema.plugin(passportLocalMongoose, {
    usernameField: 'email'  // Use 'email' instead of 'username'
});

export const coll_Users = mongoose.model('User', coll_Users_Schema);

export async function register(userInfo){
    try{
        const response = await coll_Users.register({username: userInfo.username, email: userInfo.email}, userInfo.password);

        return response;
    }catch(err){
        throw new Error(`Registration Failed: ${err}`);
    }
}

export async function login(userLogInInfo) {
    const {email, password} = userLogInInfo;
    const user = await coll_Users.authenticate()(email, password);
    if (!user) throw new Error('Incorrect Credentials');
  
    return user;
}