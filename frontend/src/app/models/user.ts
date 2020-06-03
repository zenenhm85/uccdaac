export class User{
   
    constructor(
        public name:string,
        public username:string,
        public email:string,
        public phone:string,
        public habilitado:boolean,
        public tipo:number,
        public img:string
        ){
       
    }
}    
export class UserCreate{
   
    constructor(
        public name:string,
        public username:string,
        public password:string,
        public phone:string,
        public email:string,
        public habilitado:boolean,
        public tipo:number,
        public img:string
        ){
       
    }
}    

