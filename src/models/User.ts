import * as Firebase from "firebase";

export default class User {
    public id: string;
    public email: string;
    public name: string;

    constructor(user: Firebase.User){
        this.id = user.uid;
        this.email = user.email || '';
        this.name = user.displayName || '';
    }
}