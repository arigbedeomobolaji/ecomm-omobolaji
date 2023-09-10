import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true,
  unique: true
 },
 password: {
  type: String,
  required: true
 },
 isAdmin: {
  type: Boolean,
  default: false
 }
}, {
 timestamps: true
});

userSchema.methods.toJSON = function (){
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  return userObject;
            
}

export default userSchema