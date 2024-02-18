const User = require("../models/userModel")
const {sendEmail} = require("../utils/sendEmail")
const cloudinary = require("cloudinary") ;
const fs =require("fs") ;
const scoreBoard = require('../models/scoreBoard')
const path = require('path')

exports.getOtp = async(req,res)=>{
    try {
        
        const {name,email} = req.body;
       
        const avatar = req.files.avatar.tempFilePath;
        
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        else{
            const otp = Math.floor(Math.random()* 100000 );
            const mycloud = await cloudinary.v2.uploader.upload(avatar,{
                folder:`explodingkitten/users/${email}`
              });
          
              fs.rmSync("./tmp",{recursive:true});
            const user = await User.create({
                name,email,otp,avatar: {
                    public_id: mycloud.public_id,
                    url: mycloud.secure_url,
                  },
            });
            const subject = 'Your OTP for Site'
            const link = `http://127.0.0.1:3000/register/${email}`
            await sendEmail({name,email,subject,otp,link})

            const token = await user.generateToken();
            res.status(200).cookie("token",token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}).json({
                success:true,
                message:"otp sent successfully",
                id:user._id
                
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.register = async(req,res)=>{
    try {
        const {email}=req.query;
        const user = await User.findOne({email});
        const {otp,password} = req.body;
        await scoreBoard.create({user:user._id,name:user.name})
        if(otp == user.otp){
            user.password = password;
            user.otp = null;
            await user.save();
            const token = await user.generateToken();

            res.status(200).cookie("token",token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}).json({
                success:true,
                message:'User created successfully'
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Invalid Otp"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:'Please register first!'
            })
        }
        else{
            if(user.password == password){
                const token = await user.generateToken();

                res.status(200).cookie("token",token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),httpOnly: true}).json({
                    success:true,
                    message:"Logged in",
                    user:user,
                    token:token
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message:"Invalid Password"
                })
            }
            
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//get profile
exports.getProfile = async(req,res)=>{
    try {
        
        const user = await User.findOne({_id:req.user._id});
        res.status(200).json({
            success:true,
            user:user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.deleteProfile = async(req,res)=>{
    try {
        
        const user = await User.findById(req.user._id);
        
        await user.deleteOne();
        res.status(200).clearCookie("token").json({
            success:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.logout = async(req,res)=>{
    try {
        
        res.status(200).clearCookie("token").json({
            success:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.generateCards = async(req,res)=>{
    try {
        const cards = []
        for(let i=0;i<5;i++){
            const randomNumber = Math.floor(Math.random() * 4);
            cards.push(randomNumber);
        }
        const user = await User.findById(req.user._id);
        user.cards=cards;

        //taking 0->cat, 1->bomb , 2 -> defuse, 3->shuffle
        await user.save();
        res.status(200).json({
            success:true,
            cards
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.drawCards = async(req,res)=>{
    try {
        //taking 0->cat, 1->bomb , 2 -> defuse, 3->shuffle
        //actions = 1->move to next card, 0->game lost 2->new cards, 3->no
        let cards = []
        const user = await User.findById(req.user._id);
        const userInScoreboard = await scoreBoard.findOne({user:req.user._id})
        cards=user.cards;
        const lastIndex = cards.length - 1;
        const drawnCard = cards[lastIndex];
        const nextCard = cards[lastIndex -1];
        cards.pop();
        user.cards = cards;
        await user.save();
        const cardsRemaining  = lastIndex
        const points =user.points;
       //make logic for points
       

        if(cardsRemaining < 1 ){
            
            user.points = points+1
            userInScoreboard.points=user.points
            console.log(userInScoreboard.points,user.points)
            await user.save();
            await userInScoreboard.save();
            return res.status(200).json({
                success: true,
                cardsRemaining:0,
                action:3,
                points:points,
                cards
            });
        }
        if (cards.length < 1) {
            return res.status(200).json({
                success: true,
                cardsRemaining:0,
                action:3,
                points:points,
                cards
            });
        }
       else if(drawnCard == 0){
            
            return res.status(200).json({
                success:true,
                cardsRemaining:cardsRemaining,
                action:1, // move to next card
                cardWithdrawn:0,
                points:points,
                cards
            })
        }
        else if(drawnCard == 1){
            user.cards = [];
        await user.save();
            return res.status(200).json({
                success:true,
                cardsRemaining:0,//as game is lost cards remaining is 0
                action:0, //game lost
                cardWithdrawn:1,
                points:points,
                cards
            })
        }
        else if(drawnCard == 2){
          
            if(nextCard == 1) //if next card is a bomb,change the bomb to a cat card
            {
                
                cards[lastIndex -1] = 0;
                user.cards = cards;
                await user.save();
                return res.status(200).json({
                    success:true,
                    cardsRemaining:cardsRemaining,
                    action:1, //next card
                    cardWithdrawn:2,
                    points:points,
                    cards
                })
            }
            else{
                
                return res.status(200).json({
                    success:true,
                    cardsRemaining:cardsRemaining,
                    action:1, //next card
                    cardWithdrawn:2,
                    points:points,
                    cards
                })
            }
        }
        else if(drawnCard == 3){
            
            const newCards =[];
            for(let i=0;i<5;i++){
                const randomNumber = Math.floor(Math.random() * 4);
                newCards.push(randomNumber);
            }
            user.cards = newCards;
            await user.save();
            return res.status(200).json({
                success:true,
                cardsRemaining:5,
                action:2, //new cards
                cardWithdrawn:3,
                points:points,
                cards
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getCardDetails = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        const points = user.points
        const cards = user.cards
        res.status(200).json({
            success:true,
            points:points,
            cards:cards
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.scoreboard = async(req,res)=>{
    try {
        
        const usersInScoreboard = await scoreBoard.find();
        
        res.status(200).json({
            success:true,
            users:usersInScoreboard
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}