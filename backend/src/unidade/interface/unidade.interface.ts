import {Document} from 'mongoose';

export interface Unidade extends Document {
    nome:string;
    created_at:Date;
    updated_at:Date;    
}