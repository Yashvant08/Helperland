import { User } from "../models/user";
import { HelpersRepository } from "./helpers.repository";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class HelpersService{
    public constructor(private readonly helpersRepository: HelpersRepository) {
        this.helpersRepository = helpersRepository;
    }

    public async createHelper(users:{[key: number|string]:User}): Promise<User> {
        return this.helpersRepository.createHelper(users);
    }
    public async getHelperByEmail(userEmail:string): Promise<User |null> {
        return this.helpersRepository.getHelperByEmail(userEmail);
    }
    public async getHelperByMobile(userMobile:string): Promise<User |null> {
        return this.helpersRepository.getHelperByMobile(userMobile);
    }
    public async updateHelper(helpersIsRegistered:boolean, helperEmail: string): Promise<[number, User[]]>{
        return this.helpersRepository.updateHelper(helpersIsRegistered,helperEmail);
    }
    
    public createData(helperEmail:string, token:string):typeof data{
        const data = {
            from: 'noreplay@gmail.com',
            to: helperEmail,
            subject: 'Account activation link',
            html: `<h2>Please click here to activate you account</h2>
                  <a href="${process.env.CLIENT_URL}/activate/helper/${token}">Please click here to activate you account</a>`
        }
        return data;
    }

    public createToken(helperEmail:string):string{
        const token = jwt.sign({helperEmail},process.env.JWT_ACC_ACTIVATE!,{expiresIn:'1h'});
        return token;
    }


}