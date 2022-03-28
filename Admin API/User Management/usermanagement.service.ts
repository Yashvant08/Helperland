import { User } from "../../models/user";
import { UserManagementRepository } from "./usermanagement.repository";

import { displayUsers} from "./types";
import { ServiceRequest } from "../../models/servicerequest";

export class UserManagementService {
  public constructor(
    private readonly userManagementRepository: UserManagementRepository) 
    { 
      this.userManagementRepository = userManagementRepository; 
    }

    public async getAllUsers(): Promise<displayUsers[] | null> {
      let displayUsers:displayUsers[] = [];

      const users = await this.userManagementRepository.getAllUsers();
      if(users && users.length>0){
        for(let us in users){

          const userType = await this.getUserType(users[us].UserTypeId);

          displayUsers.push({
            UserId: users[us].UserId,
            Name: users[us].FirstName +" "+ users[us].LastName,
            DateOfRegistration:users[us].createdAt.toLocaleDateString(),
            UserType:userType!,
            Phone: users[us].Mobile!,
            PostalCode : users[us].ZipCode!,
            Status: users[us].IsActive
          })
        }
        const sortedRequests = displayUsers.sort(function(a,b){ 
          return a.UserId - b.UserId;
         });
        return sortedRequests;
      }else{
        return null;
      }
    };

    public async getUserType(typeId:number):Promise<string | null>{
      let statusString:(string | null);
      if(typeId === null){
        statusString = null;
      }else if(typeId === 1){
        statusString = 'Super User';
      }else if(typeId === 2){
        statusString = 'Admin';
      }else if(typeId === 3){
        statusString = 'Service Provider';
      }else if(typeId === 4){
        statusString = 'Customer';
      }else{
        statusString = 'Invalid Status';
      }
      return statusString;
    };

    public async activeUser(userId:string):Promise<[number, User[]] | null>{
      const user = await this.userManagementRepository.getUserDetailById(parseInt(userId));
      if(user){
        if(user.IsActive){
          return null;
        }else{
          const activatedUser=await this.userManagementRepository.activeUser(parseInt(userId));
          return activatedUser;
        }
      }else{
        return null;
      }
    };

    public async inActiveUser(userId:string):Promise<[number, User[]] | null>{
      const user = await this.userManagementRepository.getUserDetailById(parseInt(userId));
      if(user){
        if(user.IsActive){
          const inActivatedUser=await this.userManagementRepository.inActiveUser(parseInt(userId));
          return inActivatedUser;
        }else{
          return null;
        }
      }else{
        return null;
      }
    };

    public async refundAmount(srId:number, refundedAmount:number, userId:number):Promise<[number, ServiceRequest[]] | null>{
      const serviceRequest = await this.userManagementRepository.getServiceRequestDetailById(srId);
      if(serviceRequest && serviceRequest.HasIssue === true){
        return this.userManagementRepository.refundAmount(srId, refundedAmount, userId);
      }else{
        return null;
      }

    }
    
    
}
