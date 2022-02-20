import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookServiceRepository } from "./bookservice.repository";
import jwt from "jsonwebtoken";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";

export class BookService {
  public constructor(
    private readonly bookServiceRepository: BookServiceRepository
  ) {
    this.bookServiceRepository = bookServiceRepository;
  }

  public async createUserAddress(userAddress: {
    [key: number | string]: UserAddress;
  }): Promise<UserAddress> {
    return this.bookServiceRepository.createUserAddress(userAddress);
  }
  
  public async getUserAddress(userId:number): Promise<UserAddress[]> {
    return this.bookServiceRepository.getUserAddresses(userId);
  }

  public async createFavoriteAndBlocked(fandb: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
    return this.bookServiceRepository.createFavoriteAndBlocked(fandb);
  }

  public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
    return this.bookServiceRepository.getFavoriteAndBlocked(userId);
  }

  public async getUserById(userId: number[]): Promise<User[]> {
    return this.bookServiceRepository.getUserById(userId);
  }

  public async getAllHelper(): Promise<User[]> {
    return this.bookServiceRepository.getAllHelper();
  }

  public async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.bookServiceRepository.getUserByEmail(userEmail);
  }

  
  //ServiceRequest services
  public async createServiceRequestWithAddress(serviceRequest: {
    [key: number | string]: ServiceRequest;
  }): Promise<ServiceRequest> {
    return this.bookServiceRepository.createServiceRequestWithAddress(serviceRequest);
  }

  public async getHelpersByZipCode(zipCode:string): Promise<User[]> {
    return this.bookServiceRepository.getHelpersByZipcode(zipCode);
  }


  //Advance Servics
  public getSubTotal(serviceHourlyRate: number, serviceHour: number): number {
    const subTotal = serviceHourlyRate * serviceHour;
    return subTotal;
  }

  public getTotalCost(ExtraService: number[], SubTotal: number): number {
    const TotalCost = ExtraService.length * 9 + SubTotal;
    return TotalCost;
  }

  public createDataForAll(userEmail:string): typeof data{
    const data = {
        from: 'Helperland Team@gmail.com',
        to: userEmail,
        subject: 'About new service in your area',
        html: `
            <h1>New service is available in your area login and accept before anyone accept it.</h1>
            `
    }
    return data;
  }

  public createToken(userEmail: string, postalCode: string): string {
    const token = jwt.sign({ userEmail, postalCode }, process.env.SECRET_KEY!, {
      expiresIn: "5h",
    });
    return token;
  }

  public getTargetUser(user:FavoriteAndBlocked[]):number[]{
    let favoriteSP = [];
    for(let us in user){
      if(user[us].IsFavorite===true && user[us].IsBlocked===false){
        favoriteSP.push(user[us].TargetUserId);
      }
    }
    return favoriteSP;
  }

  // public async getUserWithRequest(): Promise<User[]> {
  //   return this.bookServiceRepository.getUserWithRequest();
  // }

  // public async getRequestWithUser(): Promise<ServiceRequest[]> {
  //   return this.bookServiceRepository.getRequestWithUser();
  // }

  // public async createServiceRequest(serviceRequest: {
  //   [key: number | string]: ServiceRequest;
  // }): Promise<ServiceRequest> {
  //   return this.bookServiceRepository.createServiceRequest(serviceRequest);
  // }

  // public async getUsers(): Promise<User[]> {
  //   return this.bookServiceRepository.getUsers();
  // }


}
