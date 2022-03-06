import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { MySettingsRepository } from "./mysettings.repository";
import { ServiceRequest } from "../../models/servicerequest";

export class MySettingsService {
  public constructor(private readonly mySettingsRepository: MySettingsRepository) 
  {
    this.mySettingsRepository = mySettingsRepository;
  };

  public async getUserDetailById(userId:number):Promise<User | null>{
    return this.mySettingsRepository.getUserDetailById(userId);
  }

  public async updateUserDetailbyId(userId:number, user:User):Promise<[number,User[]]>{
    return this.mySettingsRepository.updateUserDetailById(userId, user);
  }

  public async getUserAddressesById(userId:number):Promise<UserAddress[]| null>{
    return this.mySettingsRepository.getUserAddressesById(userId);
  }

  public async getUserAddressByAddressId(addressId:number, userId:string):Promise<UserAddress| null>{
    return this.mySettingsRepository.getUserAddressByAddressId(addressId, parseInt(userId));
  }

  public async updateUserAddressByAddressId(addressId:string, userId:string, userAddress:UserAddress){
    return this.mySettingsRepository.updateUserAddressByAddressId(parseInt(addressId), parseInt(userId), userAddress);
  }

  public async createUserAddress(userAddress:{[key: number|string]:ServiceRequest}):Promise<UserAddress>{
    return this.mySettingsRepository.createUserAddress(userAddress);
  }

  public async deleteUserAddress(addressId:string, userId:string){
    return this.mySettingsRepository.deleteUserAddress(parseInt(addressId), parseInt(userId));
  }

  public async getUserById(userId:string):Promise<User | null>{
    return this.mySettingsRepository.getUserById(parseInt(userId));
  }

  public async changePassword(userId:string, password:string):Promise<[number,User[]]>{
    return this.mySettingsRepository.changePassword(parseInt(userId), password);
  }

  //local services

  public convertStringToDate(dateStr:any){
    const dateString = dateStr.toString().split('-').reverse().join('-');
    const date = new Date(dateString);

    return date;

  }
  
}
