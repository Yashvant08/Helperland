import { Request, Response, RequestHandler } from 'express';
import { ContactUs } from "../models/contactus";
import { UsersService } from './users.service';



export class UsersController{
    public constructor(private readonly usersService: UsersService){
        this.usersService = usersService;
    }


    public getUsers : RequestHandler = async (req, res):Promise<Response> => {
        return this.usersService
        .getUsers()
        .then((user:ContactUs[]) => {
            return res.status(200).json({user});
        })
        .catch((error:Error) => {
            return res.status(500).json({
                error: error
              });
        });
    }

    public createUsers : RequestHandler= async (req, res): Promise<Response> => {
      const firstName:string = req.body.FirstName;
      const lastName:string = req.body.LastName;
      const Name:string = firstName+" "+lastName;

      req.body.Name = Name;
      req.body.UploadFileName = req.file?.originalname;
      req.body.FilePath = req.file?.path;
      console.log(req.body);
        return this.usersService
          .createUsers(req.body)
          .then((user: ContactUs) => {
            return res.status(200).json({ user });
          })
          .catch((error: Error) => {
              console.log(error);
            return res.status(500).json({
              error: error
            });
          });
      };

      public getUserById: RequestHandler = async(req, res):Promise<Response> =>{
          return this.usersService.getUserById(+req.params.id)
          .then((user) => {
            if (user) {
              return res.status(200).json({ user });
            }
            return res.status(404).json({ error: 'NotFound' });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      }

      // public updateUsers: RequestHandler = async(req, res) : Promise<Response> =>{
      //     return this.usersService
      //     .updateUsers(req.body, +req.params.id)
      //     .then((user) => {
      //       return res.status(200).json({ user });
      //     })
      //     .catch((error: Error) => {
      //       return res.status(500).json({
      //         error: error
      //       });
      //     });
      // }

      // public deleteUsers: RequestHandler = async(req, res): Promise<Response> => {
      //   return this.usersService
      //   .deleteUsers(+req.params.id)
      //   .then((user) => {
      //       if (user > 0) {
      //           return res.status(200).json({ user });
      //       }
      //       return res.status(404).json({ error: 'NotFound' });
      //    })
      //   .catch((error: Error) => {
      //       return res.status(500).json({
      //       error: error
      //       });
      //   });
      // }
}