import {db} from "../models/index"
import {ContactUs} from "../models/contactus"

export class UsersRepository{

    public async createUsers(users: {[key: number|string]:ContactUs}): Promise<ContactUs>{
        return db.ContactUs.create(users);
    }

    public async getUsers(): Promise<ContactUs[]> {
        return db.ContactUs.findAll();
    }

    public async getUserById(userId:number): Promise<ContactUs |null> {
        return db.ContactUs.findOne({where: {ContactUsId: userId}});    
    }

    public async deleteUsers(userId:number): Promise<number> {
        return db.ContactUs.destroy({where: {ContactUsId : userId}});
    }

    public async updateUsers(users:ContactUs, userId: number): Promise<[number, ContactUs[]]>{
        return db.ContactUs.update(users, {where: {ContactUsId: userId}});
    }


}