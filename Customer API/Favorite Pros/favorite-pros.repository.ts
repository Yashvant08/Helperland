import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Op } from "sequelize";

export class FavoriteProsRepository {

  public async getAllServiceRequestByUserId(userId:number): Promise<ServiceRequest[]>{
    return db.ServiceRequest.findAll({where:{UserId:userId}});
  }

  public async getAllHelperWorkedWithCustomerInPast(userId: number[]): Promise<User[] | null> {
    return db.User.findAll({
      where: { UserTypeId: 3 ,  UserId: {
        [Op.or]: userId
      }}, 
      include:'TargetUserId'
    });
  }

  public async getFavoriteHelper(userId: number, helperId:number): Promise<FavoriteAndBlocked|null> {
    return db.FavoriteAndBlocked.findOne({where:{UserId:userId, TargetUserId:helperId}});
  }

  public async createFavoriteHelper(favorite:{[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked|null> {
    return db.FavoriteAndBlocked.create(favorite);
  }

  public async updateFavoriteHelper(favorite:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update(
      { IsFavorite: favorite.IsFavorite},
      { where: { UserId:favorite.UserId, TargetUserId:favorite.TargetUserId } }
    );
  }

  public async updateBlockedHelper(blocked:FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update(
      { IsBlocked: blocked.IsBlocked},
      { where: { UserId:blocked.UserId, TargetUserId:blocked.TargetUserId } }
    );
  }
}
