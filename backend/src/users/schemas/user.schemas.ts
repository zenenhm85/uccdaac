import {Schema} from 'mongoose';

export const UserSchema = new Schema({
    
    name:{type:String, required:true}, 
    username:{type:String, required:true,unique: [true, "O Nome de Usuário deve ser único. Este já existe"]},
    password:{type:String}, 
    email:{type:String, required:true,unique: [true, "O email deve ser único. Este já existe"]},
    phone:{type:String, required:true,unique: [true, "O Telefone deve ser único. Este já existe"]}, 
    habilitado:{type:Boolean}, 
    tipo:{type:Number,default:1},
    img:{type:String}, 
    created_at:{ type: Date},
    updated_at:{ type: Date}    
});