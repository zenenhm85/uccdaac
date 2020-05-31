export class User{
   
    constructor(
        public name:string,
        public username:string,
        public email:string,
        public habilitado:number,
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
        public email:string,
        public habilitado:number,
        public tipo:number,
        public img:string
        ){
       
    }
}    

