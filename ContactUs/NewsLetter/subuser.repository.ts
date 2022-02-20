import {db} from "../../models/index"
import {SubUser} from "../../models/subuser"

export class SubUserRepository{

    public async createSubUser(subUser: {[key: number|string]:SubUser}): Promise<SubUser>{
        return db.SubUser.create(subUser);
    }

    public async getSubUsers(): Promise<SubUser[]> {
        return db.SubUser.findAll();
    }

    public async getSubUserById(userId:number): Promise<SubUser |null> {
        return db.SubUser.findOne({where: {id: userId}});    
    }

    public async getSubUserByEmail(userEmail:string): Promise<SubUser |null> {
        return db.SubUser.findOne({where: {Email: userEmail}});    
    }

    public async updateSubUser(IsConfirmedSub:boolean, Email: string): Promise<[number, SubUser[]]>{
        return db.SubUser.update({IsConfirmedSub:IsConfirmedSub}, {where: {Email: Email}});
    }


}