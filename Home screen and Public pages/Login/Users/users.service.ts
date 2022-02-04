import { User } from "../models/user";
import { UsersRepository } from "./users.repository";
import jwt from "jsonwebtoken";

export class UsersService{
    public constructor(private readonly usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }
    
    public async createUsers(users:{[key: number|string]:User}): Promise<User> {
        return this.usersRepository.createUsers(users);
    }
    
    public async getUserByEmail(userEmail:string): Promise<User |null> {
        return this.usersRepository.getUserByEmail(userEmail);
    }
    
    public async getUserByMobile(userMobile:string): Promise<User |null> {
        return this.usersRepository.getUserByMobile(userMobile);
    }
    
    public async updateUser(userIsregistered:boolean, userEmail: string): Promise<[number, User[]]>{
        return this.usersRepository.updateUser(userIsregistered,userEmail);
    }

    public createData(userEmail:string, token:string): typeof data{
        const data = {
            from: 'noreplay@gmail.com',
            to: userEmail,
            subject: 'Account activation link',
            html: `<h2>Please click here to activate you account</h2>
                  <a href="${process.env.CLIENT_URL}/activate/user/${token}">Please click here to activate you account</a>`
        }
        return data;
    }

    public createToken(userEmail:string):string{
        const token = jwt.sign({userEmail},process.env.JWT_ACC_ACTIVATE!,{expiresIn:'1h'});
        return token;
      }
    

}