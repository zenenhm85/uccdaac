import {Document} from 'mongoose';

export interface User extends Document {
    username:string;   
    name:string, 
    password:string;    
    email:string,
    habilitado:number,
    tipo:number,
    img:string  
}
export interface UserModel {
    username:string,
    name:string,
    email:string,
    habilitado:number,
    tipo:number,
    img:string  
}