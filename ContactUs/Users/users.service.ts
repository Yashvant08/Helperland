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
}