import { SubUser } from "../../models/subuser";
import { SubUserRepository } from "./subuser.repository";
import jwt from "jsonwebtoken";

export class SubUserService{
    public constructor(private readonly subUserRepository: SubUserRepository) {
        this.subUserRepository = subUserRepository;
    }

    public async createSubUser(subUser: {[key: number|string]:SubUser}): Promise<SubUser>{
        return this.subUserRepository.createSubUser(subUser);
    }

    public async getSubUsers(): Promise<SubUser[]> {
        return this.subUserRepository.getSubUsers();
    }

    public async getSubUserById(subUserId:number): Promise<SubUser |null> {
        return this.subUserRepository.getSubUserById(subUserId);    
    }

    public async getSubUserByEmail(subUserEmail:string): Promise<SubUser |null> {
        return this.subUserRepository.getSubUserByEmail(subUserEmail);    
    }

    public createData(userEmail:string, token:string): typeof data{
        const data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'Newsletter confirmation, entry in our mailing list',
            html: `
                <html>
                    <head>
                        <style>
                        a{
                        background-color: #f44336;
                        color: white;
                        padding: 14px 25px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        }
                        
                        a:hover, a:active {
                        background-color: red;
                        }
                        </style>
                    </head>
                    <body>
                        <h1>Hello,</h1>
                        </br>
                        </br>
                        <h2>Application for newsletter subscription</h2>
                        </br>
                        <h2>Thank you, we have received your registration for the newsletter. To confirm that you would like to receive the newsletter by email, please click on the following button:</h2>
                        </br>
                        <a href="${process.env.CLIENT_URL}/trainee2021/contact-us/sb-User/activate/${token}">confirm subscription</a>
                        </br>
                        <h2>Many greetings</h2>
                        </br>
                        <h2>your Helperland team</h2>
                    </body>
                </html>
                `
        }
        return data;
    }

    public createDataForAll(userEmail:string): typeof data{
        const data = {
            from: 'yashvantdesai7@gmail.com',
            to: userEmail,
            subject: 'Message from helperland',
            html: `
                <h1>Hello,</h1>
                `
        }
        return data;
    }

    public createToken(Email:string):string{
        const token = jwt.sign({Email},process.env.JWT_ACC_ACTIVATE!,{expiresIn:'1h'});
        return token;
      }

      public async updateSubUser(IsConfirmedSub:boolean, Email: string): Promise<[number, SubUser[]]>{
        return this.subUserRepository.updateSubUser(IsConfirmedSub,Email);
    }
}