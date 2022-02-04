import {db} from "../models/index"
import {User} from "../models/user"

export class UsersRepository{

    public async createUsers(users: {[key: number|string]:User}): Promise<User>{
        return db.User.create(users);
    }

    public async getUserByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }
    public async getUserByMobile(userMobile:string): Promise<User | null>{
        return db.User.findOne({where: {Mobile: userMobile}}); 
    }

    public async updateUser(userIsRegistered:boolean, userEmail: string): Promise<[number, User[]]>{
        return db.User.update({IsRegisteredUser:userIsRegistered}, {where: {Email: userEmail}});
    }


}