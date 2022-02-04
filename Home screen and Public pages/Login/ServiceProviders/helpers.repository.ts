import {db} from "../models/index"
import {User} from "../models/user"

export class HelpersRepository{

    public async createHelper(users: {[key: number|string]:User}): Promise<User>{
        return db.User.create(users);
    }

    public async getHelperByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }
    public async getHelperByMobile(userMobile:string): Promise<User | null>{
        return db.User.findOne({where: {Mobile: userMobile}}); 
    }

    public async updateHelper(helpersIsRegistered:boolean, helperEmail: string): Promise<[number, User[]]>{
        return db.User.update({IsRegisteredUser:helpersIsRegistered}, {where: {Email: helperEmail}});
    }


}