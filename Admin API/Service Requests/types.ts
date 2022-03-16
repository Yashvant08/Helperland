 export type displayRequest= {
            ServiceId: number,
            ServiceDate:{
                Date:string,
                Time:string
            },
            CustomerDetails:{
                Name: string,
                UserId: number | null,
                Address: {
                    StreetName: string | undefined,
                    HouseNumber: string | undefined,
                    PostalCode : string | undefined,
                    City: string | undefined
                }
            },
            ServiceProvider:{
                Name: string | undefined,
                ServiceProviderId: number | null,
                ProfilePicture: string | undefined,
                Ratings: number | undefined,
            }
            GrossAmount:number
            NetAmount: number,
            Discount:number,
            Status: string | null,
            PaymentStatus:boolean,
            HasIssue:boolean

        }

// export type filterRequest= {
//             ServiceId: number,
//             ServiceDate:object,
            
//             ServuceProviderId: number | null,
//             CustomerDetails:{
//                 Name: string,
//                 Address: {
//                     StreetName: string | undefined,
//                     HouseNumber: string | undefined,
//                     PostalCode : string | undefined,
//                     City: string | undefined
//                 }
//             },
//             ServiceProvider:{
//                 Name: string | undefined,
//               ProfilePicture: string | undefined,
//               Ratings: number | undefined,
//             }
//             GrossAmount:number
//             NetAmount: number,
//             Discount:number,
//             Status: string | null,
//             PaymentStatus:boolean

//         }

export type filters= {
            ServiceRequestId: number,
            PostalCode : string |null,
            Email: string | null,
            UserId: number | null,
            ServiceProviderId: number | null,
            Status: string | null,
            PaymentStatus: number | null,
            PenaltyStatus: number | null,
            HasIssue: boolean,
            FromDate:string | null,
            ToDate: string | null
        }