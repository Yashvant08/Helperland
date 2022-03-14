import { User } from "../../models/user";
import { FavoriteProsRepository } from "./favorite-pros.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class FavoriteProsService {
  public constructor(private readonly favoriteProsRepository: FavoriteProsRepository) 
  {
    this.favoriteProsRepository = favoriteProsRepository;
  };

  public async getAllServiceRequestByUserId(userId:number):Promise<ServiceRequest[]>{
    return this.favoriteProsRepository.getAllServiceRequestByUserId(userId);
  }

  public async getAllHelperWorkedWithCustomerInPast(userId:number[]):Promise<User[] | null>{
    return this.favoriteProsRepository.getAllHelperWorkedWithCustomerInPast(userId);
  }

  public async getFavoriteHelper(userId: number, helperId:number): Promise<FavoriteAndBlocked|null> {
    return this.favoriteProsRepository.getFavoriteHelper(userId, helperId);
  }

  public async createFavoriteHelper(favorite:{[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked|null> {
    return this.favoriteProsRepository.createFavoriteHelper(favorite);
  }

  public async updateFavoriteHelper(favorite:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.favoriteProsRepository.updateFavoriteHelper(favorite);
  }

  public async updateBlockedHelper(blocked:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.favoriteProsRepository.updateBlockedHelper(blocked);
  }





  //Local services
  public getAllHelperIdWorkedWithCustomerInPast(sRequest:ServiceRequest[]){
    const helperId:number[] = [];
    for(let sr in sRequest){
      if(sRequest[sr].Status === 3 && sRequest[sr].ServiceProviderId != null){
        helperId.push(sRequest[sr].ServiceProviderId);
      }
    }
    return helperId;
  }
  
}
