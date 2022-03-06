import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";

export class MySettingsRepository {

  public async getUserDetailById(userId:number):Promise<User | null>{
    return db.User.findOne({where:{UserId:userId, UserTypeId:4}});
  }

  public async updateUserDetailById(userId:number, user:User):Promise<[number, User[]]>{
    return db.User.update({
      FirstName:user.FirstName,
      LastName:user.LastName,
      Mobile:user.Mobile,
      DateOfBirth:user.DateOfBirth,
      LanguageId:user.LanguageId,
      ModifiedBy:userId
    }, {where:{UserId:userId}});
  }

  public async getUserAddressesById(userId:number):Promise<UserAddress[]| null>{
    return db.UserAddress.findAll({where:{UserId:userId, IsDeleted:false}});
  }

  public async getUserAddressByAddressId(addressId:number, userId:number):Promise<UserAddress| null>{
    return db.UserAddress.findOne({where:{AddressId:addressId, UserId:userId}});
  }

  public async updateUserAddressByAddressId(addressId:number, userId:number, userAddress:UserAddress):Promise<[number,UserAddress[]]>{
    return db.UserAddress.update({
      Addressline1:userAddress.Addressline1,
      Addressline2:userAddress.Addressline2,
      PostalCode:userAddress.PostalCode,
      City:userAddress.City,
      Mobile:userAddress.Mobile

    },{where:{AddressId:addressId, UserId:userId}})
  }

  public async createUserAddress(userAddress:{[key: number|string]:ServiceRequest}):Promise<UserAddress>{
    return db.UserAddress.create(userAddress);
  }

  public async deleteUserAddress(addressId:number, userId:number){
    return db.UserAddress.update({IsDeleted:true},{where:{AddressId:addressId, UserId:userId}});
  }

  public async getUserById(userId:number):Promise<User | null>{
    return db.User.findOne({where:{UserId:userId}});
  }

  public async changePassword(userId:number, password:string):Promise<[number,User[]]>{
    return db.User.update({Password:password},{where:{UserId:userId}});
  }

}
