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

export class ApiGuideComment {
    

    constructor(){
        let date = new Date();

        this.content = "";
        this.author = "";
        this.like = 0;
        this.dislikes = 0;
    }

    _id?: string;
    content: string;
    author: string;
    like?: number;
    dislikes?: number;

}

export class ApiGameGuide {


    constructor(){
        let date = new Date();

        this.fullTitle = "";
        this.shortTitle = "";
        this.languageCode = "en";
        this.category = "";
        this.patch = "1.12";
        this.keywords = [];
        this.votes = [];
        this.rating = 0;
        this.description = "";
        this.content = "";
        this.status = "";
        this.linkYouTube = "";
        this.images = [];
        this.author = "";
        this.dateCreated = date.toISOString();
        this.dateUpdated = date.toISOString();
        this.comments = [];

    }

    _id?: string;
    fullTitle: string;
    shortTitle: string;
    languageCode: string;
    category: string;
    patch?: string;
    keywords?: string[];
    votes?: number[];
    rating?: number;
    description: string;
    content: string;
    status?: string;
    linkYouTube?: string;
    images?: string[];
    author: string;
    dateCreated?: string;
    dateUpdated?: string;
    comments: ApiGuideComment[];

}

export class GameGuideForm {

    constructor(){
        let date = new Date();

        this.author = "";
        this.fullTitle = "";
        this.shortTitle = "";
        this.description = "";
        this.category = "";
        this.content = "";
    }

    author: string;
    fullTitle: string;
    shortTitle: string;
    description: string;
    category: string;
    content: string;

}

export class GameGuideCategories {
    
    constructor(){
        this.categories = ["Leveling", "Dungeon", "Class", "PVP" ];
    }

    categories: string[];
}


export class ApiForum {
   
    _id: string;
    subject: string;
    dateCreated: string;
    content: string;
    author: string;
    like: number;
    dislikes: number;
    constructor(){
        let date = new Date();
        this.subject = "";
        this.content = "";
        this.dateCreated = date.toISOString();
        this.author = "";
        this.like = 0;
        this.dislikes = 0;
    }
}