"use strict";
// import { Request, Response, RequestHandler } from "express";
// import { ContactUsAttachment } from "../models/contactusattachment";
// import { AttachmentService } from "./attachment.service";
// export class AttachmentController{
// public constructor(private readonly attachmentService: AttachmentService){
//     this.attachmentService = attachmentService;
// }
// public createAttachment : RequestHandler= async (req, res): Promise<Response> => {
//     req.body.FileName = req.file?.originalname;
//     req.body.FilePath = req.file?.path;
//     console.log(req.body);
//     return this.attachmentService
//       .createAttachment(req.body)
//       .then((user: ContactUsAttachment) => {
//         return res.status(200).json({ user });
//        })
//       .catch((error:Error) => {
//         console.log(error);
//         return res.status(500).json({error:error});
//       });
//   };
// }
