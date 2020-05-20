import {Schema} from 'mongoose';

export const UnidadeSchema = new Schema({
    nome:{type:String, required:true,unique: [true, "O nome da unidade orgânica é único"]}, 
    created_at:{ type: Date},
    updated_at:{ type: Date}
});