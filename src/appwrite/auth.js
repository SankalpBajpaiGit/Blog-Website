import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const id = ID.unique();
            const userAccount = await this.account.create(id, email, password, name);
            console.log(id);
            if(userAccount){
            // call another method
                return this.login({email, password});
            }
            else{
                return userAccount
            }
        } catch(error){
            throw error;
        }
    }
    
    async login({ email, password }) {
    try {
        await this.account.createEmailPasswordSession(email, password);
        window.location.href = "/";
    } catch (error) {
        throw error;
    }
}
    

    async getCurrentUser() {
        try{
            return await this.account.get();
        } catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try{
            await this.account.deleteSessions('current');
            window.location.href = "/";
        }catch(error){
            console.log("Appwrite service :: logout :: error" , error);
        }
    }
}

const authService = new AuthService();

export default authService
