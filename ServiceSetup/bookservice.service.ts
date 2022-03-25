import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookServiceRepository } from "./bookservice.repository";
import jwt from "jsonwebtoken";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import moment from "moment";
import { saveServiceRequestDetail, serviceRequestAddress } from "./types";
import { SRAddress } from "../models/servicerequestaddress";

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

  public async getUserById(userId: number[], zipCode:string): Promise<User[]> {
    return this.bookServiceRepository.getUserById(userId, zipCode);
  }

  public async getHelperById(userId: number): Promise<User|null> {
    return this.bookServiceRepository.getHelperById(userId);
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

  public async getBlockedHelper(userId:number, helpers:User[]):Promise<FavoriteAndBlocked[]|null>{
    const helperIds:number[] = [];
    for(let us in helpers){
      helperIds.push(helpers[us].UserId);
    }
    return this.bookServiceRepository.getBlockedHelper(userId, helperIds);
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
        from: 'yashvantdesai7@gmail.com',
        to: userEmail,
        subject: 'About new service in your area',
        html: `
            <h1>New service is available in your area login and accept before anyone accept it.</h1>
            `
    }
    return data;
  }

  public createData(userEmail:string, srId:number): typeof data{
    const data = {
        from: 'yashvantdesai7@gmail.com',
        to: userEmail,
        subject: 'About new service allocation',
        html: `
            <h1>A service request ${srId} has been directly assigned to you.</h1>
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

  public async getTargetUser(user:FavoriteAndBlocked[], zipCode:string):Promise<Object[]>{
    let helperId:number[] = [];
    let favoriteSpDetail = [];
    for(let us in user){
      helperId.push(user[us].TargetUserId);
    }
    const helperblock = await this.bookServiceRepository.getAllBlockedCustomerOfHelper(helperId);

    const favoriteSP = user.filter(ar => !helperblock.find(rm => (rm.UserId === ar.TargetUserId && ar.UserId === rm.TargetUserId) ));
    for(let sp in favoriteSP){
      const spDetail = await this.bookServiceRepository.getHelperById(favoriteSP[sp].TargetUserId);
      if(spDetail && spDetail.ZipCode === zipCode ){
        favoriteSpDetail.push({
          ServiceProviderId:spDetail.UserId,
          ServiceProviderName: spDetail.FirstName!+" "+spDetail.LastName,
          ProfilePicture: spDetail.UserProfilePicture
        })
      }
    }
    return favoriteSpDetail;
  }
  
  public getEmailAddressForSendEmail(user:User[], body:any){
    let Email =[];
    if(body.HasPets === true){
      console.log("hi");
      for (let count in user) {
        if(user[count].WorksWithPets === true)
        Email.push(user[count].Email!);
      }
    }else{
      console.log("h2");
      for (let count in user) {
        Email.push(user[count].Email!);
      }
    }
    return Email;

  }

  public removeBlockedHelper(user:User[], blockedHelpers:FavoriteAndBlocked[]):User[]{

    const users = user.filter((item) =>{
      return blockedHelpers.every((f) => {
        return f.TargetUserId !== item.UserId;
      });
    });
    return users;

  }

  public async compareDateWithCurrentDate(date: string):Promise<boolean> {
    const formatedDate1 = new Date(date.split("-").reverse().join("-"));
    const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
    if (formatedDate1 > formatedDate2) {
      return true;
    } else {
      return false;
    }
  };

  public async removeHelperBlockedLoginCustomer(userId:number, helpers:User[]):Promise<User[]>
  {
    const helperIds:number[] = [];
    // console.log(helpers);
    for(let hp in helpers){
      helperIds.push(helpers[hp].UserId);
    }
    const blockedCustomer  = await this.bookServiceRepository.getHelpersBlockedCustomer(userId, helperIds);
    // console.log(blockedCustomer);
    let filteredHelper = helpers.filter((sr) =>{
          return !blockedCustomer.find((rm) => {
            return (rm.UserId === sr.UserId)
          }
        )} 
      );
    // console.log(filteredHelper);
    return filteredHelper;
  }

  public async saveServiceRequestDetail(requestDetail:saveServiceRequestDetail, email:string):Promise<ServiceRequest | null>{
    const user = await this.bookServiceRepository.getUserByEmail(email);
    if(user){
      requestDetail.Email = email;
      requestDetail.UserId = user.UserId;
      requestDetail.Status = 1;
      requestDetail.ModifiedBy = user.UserId;
      requestDetail.ServiceHourlyRate = 18;
      requestDetail.ExtraHours = requestDetail.ExtraService.length * 0.5;
      requestDetail.SubTotal = requestDetail.ServiceHourlyRate * requestDetail.ServiceHours
      requestDetail.TotalCost = requestDetail.ExtraService.length * 9 + requestDetail.SubTotal;
      return this.bookServiceRepository.saveServiceRequestDetail(requestDetail);
    }else{
      return null;
    }
  }

  public async createServiceRequestAddress(requestId:number,addressId:number,userId:number):Promise<SRAddress | null>{
    const alreadyAvailAddress = await this.bookServiceRepository.getServiceRequestAddress(requestId);
    console.log(alreadyAvailAddress);
    if(alreadyAvailAddress){
      return null;
    }else{
      const address = await this.bookServiceRepository.getUserAddressById(addressId);
      if(address && address.UserId === userId){
        var srAddress:serviceRequestAddress = JSON.parse(JSON.stringify(address));
        srAddress.ServiceRequestId = requestId;
        return this.bookServiceRepository.createSRAddress(srAddress);
      }else{
        return null;
      }
    }
    
  }

  public async completeServiceRequest(spId:number,srId:number){
    return this.bookServiceRepository.completeServiceRequest(spId, srId);
  }


}
