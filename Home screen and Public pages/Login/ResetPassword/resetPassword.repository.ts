import {db} from "../models/index"
import {User} from "../models/user"


export class ResetRepository{

    public async getUserByEmail(userEmail:string):Promise<User|null>{
        return db.User.findOne({where:{Email:userEmail}});
    }

    public async getUserById(userId:number):Promise<User|null>{
        return db.User.findOne({where:{UserId:userId}});
    }

    public async updateUser(userPassword:string, userId:number):Promise<[number, User[]]>{
        return db.User.update({Password:userPassword}, {where:{UserId:userId}});
    }
}