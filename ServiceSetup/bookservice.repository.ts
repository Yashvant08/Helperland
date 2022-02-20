import {db} from "../models/index";
import {User} from "../models/user";
import {UserAddress} from "../models/useraddress";
import { ServiceRequest } from "../models/servicerequest";
import { SRAddress } from "../models/servicerequestaddress";
import { SRExtra } from "../models/servicerequestextra";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";

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
        return db.FavoriteAndBlocked.findAll({where:{UserId:userId}});
    }

    public async getUserById(userId: number[]): Promise<User[]> {
        return db.User.findAll({where:{UserId:userId}});
    }

    public async getUserByEmail(userEmail:string): Promise<User | null>{
        return db.User.findOne({where: {Email: userEmail}}); 
    }

    public async getHelpersByZipcode(zipCode:string): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:3, ZipCode:zipCode}});
    }

    public async getAllHelper(): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:3}});
    }


    //Service Request methods
    public async createServiceRequest(ServiceRequest:{[key: number|string]:ServiceRequest}): Promise<ServiceRequest>{
        return db.ServiceRequest.create(ServiceRequest);
    }

    public async createServiceRequestWithAddress(ServiceRequest:{[key: number|string]:ServiceRequest}): Promise<ServiceRequest>{
        return db.ServiceRequest.create(ServiceRequest,{include:['ServiceRequestAddress', 'ExtraService']});
    }

    // public async getUserAddress(): Promise<UserAddress[]> {
    //     return db.UserAddress.findAll({include: db.User});
    // }

    // public async getUsers(): Promise<User[]> {
    //     return db.User.findAll({include: db.UserAddress});
    // }

    // public async getUserWithRequest(): Promise<User[]> {
    //     return db.User.findAll({include: 'UserRequest'});
    // }

    // public async getRequestWithUser(): Promise<ServiceRequest[]> {
    //     return db.ServiceRequest.findAll({include: 'UserRequest'});
    // }


}