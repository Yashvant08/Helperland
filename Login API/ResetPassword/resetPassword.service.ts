import { User } from "../../models/user";
import { ResetRepository } from "./resetPassword.repository";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
require("dotenv").config();



export class ResetService {
  public constructor(private readonly resetRepository: ResetRepository) {
    this.resetRepository = resetRepository;
  }

  public async getUserByEmail(userEmail:string):Promise<User|null>{
    return this.resetRepository.getUserByEmail(userEmail);
  }

  public async getUserById(userId:number):Promise<User|null>{
    return this.resetRepository.getUserById(userId);
  }

  public createData(userEmail:string, token:string): typeof data{
    const data = {
        from: 'yashvantdesai7@gmail.com',
        to: userEmail,
        subject: 'Reset Password',
        html: `<h2>Please click on reset password to change password</h2>
              <a href="${process.env.CLIENT_URL}/reset-password/${token}">reset password</a>`
    }
    return data;
  }

  public createToken(userId:number):string{
      const token = jwt.sign({userId},process.env.FORGOT_PASSWORD!,{expiresIn:'30m'});
      return token;
  }

  public async updateUser(userPassword:string, userId:number):Promise<[number, User[]]>{
    return this.resetRepository.updateUser(userPassword, userId);
}

}