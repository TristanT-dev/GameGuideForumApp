// userAccount



export class ApiUserAccount {

    constructor(){

        this.username = "";
        //this.email = "";
        this.password = "";
        this.role = "";
        this.dateCreated = "";
    }

    _id?: string;
    username: string;
    //email: string;
    password: string;
    role: string;
    dateCreated: string;
}

export class RegisterForm {
    
    constructor(){
        this.username = "";
        this.password = "";
        this.password2 = "";
        
    }

    username: string;
    password: string;
    password2: string;
}

export class Credentials {

    constructor(){
        this.username = "";
        this.password = "";
    }

    username: string;
    password: string;

}