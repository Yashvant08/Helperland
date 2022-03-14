import {db} from "../models/index";
import {User} from "../models/user";
import {UserAddress} from "../models/useraddress";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { Op } from "sequelize";

export class BookServiceRepository{

    public async createUserAddress(userAddress: {[key: number|string]:UserAddress}): Promise<UserAddress>{
        return db.UserAddress.create(userAddress);
    }

    public async getUserAddresses(userId:number): Promise<UserAddress[]> {
        return db.UserAddress.findAll({where:{UserId:userId}});
    }

    public async createFavoriteAndBlocked(fandb: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
        return db.FavoriteAndBlocked.create(fandb);
    }

    public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:userId, IsFavorite:true, IsBlocked:false}});
    }

    public async getAllBlockedCustomerOfHelper(userId:number[]): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:{[Op.or]:userId}, IsBlocked:true}});
    }

    public async getUserById(userId: number[], zipCode:string): Promise<User[]> {
        return db.User.findAll({where:{UserId:userId, ZipCode:zipCode}});
    }

    public async getHelperById(userId: number): Promise<User |null > {
        return db.User.findOne({where:{UserId:userId, UserTypeId:3}});
    }

    public async getUserByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }

    public async getHelpersByZipcode(zipCode:string): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:3, ZipCode:zipCode},include:'TargetUserId'});
    }

    public async getAllHelper(): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:3}});
    }

    public async getHelpersBlockedCustomer(userId:number, helprId:number[]): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:{[Op.or]:helprId}, TargetUserId:userId, IsBlocked:true}});
    }


    //Service Request methods
    public async createServiceRequest(ServiceRequest:{[key: number|string]:ServiceRequest}): Promise<ServiceRequest>{
        return db.ServiceRequest.create(ServiceRequest);
    }

    public async createServiceRequestWithAddress(ServiceRequest:{[key: number|string]:ServiceRequest}): Promise<ServiceRequest>{
        return db.ServiceRequest.create(ServiceRequest,{include:['ServiceRequestAddress', 'ExtraService']});
    }

    public async getBlockedHelper(userId:number, helperIds:number[]):Promise<FavoriteAndBlocked[]|null>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:userId, TargetUserId:{[Op.or]: helperIds}, IsBlocked:true}});
    }

}