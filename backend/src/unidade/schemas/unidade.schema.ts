import {Schema} from 'mongoose';

export const UnidadeSchema = new Schema({
    nome:{type:String, required:true}, 
    siglas:{type:String, required:true,unique: [true, "A abreviatura deve ser única"]}, 
    created_at:{ type: Date},
    updated_at:{ type: Date}
});