import { ContactUs } from "../../models/contactus";
import { User } from "../../models/user";
import { UsersRepository } from "./users.repository";

export class UsersService{
    public constructor(private readonly usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async createUsers(users:{[key: number|string]:ContactUs}): Promise<ContactUs> {
        return this.usersRepository.createUsers(users);
    }
    public async getUserById(userId:number): Promise<ContactUs |null> {
        return this.usersRepository.getUserById(userId);
    }

    public async getUserByEmail(userEmail:string): Promise<User |null> {
        return this.usersRepository.getUserByEmail(userEmail);
    }

    public async getUsers(): Promise<ContactUs[]> {
        return this.usersRepository.getUsers();
    }

    public async updateUsers(users:ContactUs, userId: number): Promise<[number, ContactUs[]]>{
        return this.usersRepository.updateUsers(users,userId);
    }

    public async deleteUsers(userId:number): Promise<number> {
        return this.usersRepository.deleteUsers(userId);
    }

    public createData(
        adminEmail:string,
        Name:string,
        email:string,
        subject:string,
        mobile:string,
        message:string
        ): typeof data{
        const data = {
            from: 'yashvantdesai7@gmail.com',
            to: adminEmail,
            subject: 'ContactUs',
            html: `
                <h1>“Below user want's to reach us”.</h1>
                <p>Name    : ${Name}</p>
                <p>Email   : ${email}</p>
                <p>Subject : ${subject}</p>
                <p>Mobile  : ${mobile}</p>
                <p>Message : ${message}</p>
                `
        }
        return data;
      };

      public async getAllAdminEmails():Promise<string[]>{
          let adminEmails:string[] = [];
          const admins = await this.usersRepository.getAdminUser();
          if(admins && admins.length>0){
              for(let ad in admins){
                  adminEmails.push(admins[ad].Email!);
              }
          }
          return adminEmails;
      }
}