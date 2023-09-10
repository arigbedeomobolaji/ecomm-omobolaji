import express from "express"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import User from "../model/User.js"
import data from "../data.js"
import { generateAuthToken, verifyAuthToken } from "../utils.js"


const userRouter = express.Router()

userRouter.get("/seed", asyncHandler(async (req, res) => {
 const createdUsers = await User.insertMany(data.users)
 res.send(createdUsers)
}))

userRouter.post("/signin", asyncHandler(async (req, res) => {
 const user = await User.findOne({email: req.body.email})
 if (user) {
  if (await bcrypt.compare(req.body.password, user.password)) {
   return res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateAuthToken(user)
   })
  }
 }
 res.status(401).send({message: "invalid username or password"})
}))

 userRouter.post("/register", asyncHandler(async (req, res) => {
  const {name, email, password } = req.body
  const user = new User({
   name,
   email,
   password: bcrypt.hashSync(password, 8)
  })
  try {
   const createdUser = await user.save()
   if(createdUser) {
    return res.send({
     _id: createdUser._id,
     name: createdUser.name,
     email: createdUser.email,
     isAdmin: createdUser.isAdmin,
     token: generateAuthToken(createdUser)
    })
   }
  } catch (error) {
   res.status(401).send({message: "Email Already exist!!!"})
  }
 }))

userRouter.get('/:id', asyncHandler(async(req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if(user){
      res.send(user);
    }
  }catch(err){
    res.status(404).send({error: 'User not found'});
  }
}));

userRouter.put('/profile', verifyAuthToken, asyncHandler(async (req,res) => {
  const {userId, name, email, password } = req.body
  try{
    const user = await User.findById(userId);
    user.name = name || user.name;
    user.email = email || user.email;
    if(password){
      user.password = await bcrypt.hash(password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateAuthToken(updatedUser)
     });
  }catch(error){
    const message = error.message
    if(message.includes('duplicate key error')){
      return res.status(404).send({error: "Unauthorized try another Email Address."});
    }
    res.status(404).send({error: error.message});
  }
}));

export default userRouter;