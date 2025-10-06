import { types } from "@babel/core";
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    user:{type:String},
    role:{
        type:String,
        enum:["Customer","Admin","DeliverPartner"],
        required:true
    },
    isActivated:{type:Boolean,default:false}
})

const customerSchema=new mongoose.Schema({
    ...userSchema.obj,
    phone:{type:Number,unique:true,required:true},
    role:{type:String,enum:['Customer'],default:'Customer'},
    liveLocation:{
        latitude:{type:Number},
        longitude:{type:Number},
    },
    address:{type:String}
})

const delliveryPartnerSchema=new mongoose.Schema({
    ...userSchema.obj,
    email:{type:String,unique:true,required:true},
    password:{type:String,unique:true,required:true},
    phone:{type:Number,unique:true,required:true},
    role:{type:String,enum:['DeliverPartner'],default:'DeliverPartner'},
    liveLocation:{
        latitude:{type:Number},
        longitude:{type:Number},
    },
    address:{type:String},
    branch:{
        type:mongoose.Schema.Types.ObjectIdbjectId,
        ref:'Branch',
    },
})

const adminSchema=new mongoose.Schema({
     ...userSchema.obj,
     email:{type:String,unique:true,required:true},
     password:{type:String,unique:true,required:true},
      role:{type:String,enum:['Admin'],default:'Admin'},
})

export const Customer=mongoose.model('Customer',customerSchema)
export const DeliverPartner=mongoose.model('DeliverPartner',delliveryPartnerSchema)
export const Admin=mongoose.model('Admin',adminSchema)