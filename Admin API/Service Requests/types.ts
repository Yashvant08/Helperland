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

export type filters= {
            ServiceRequestId: number,
            PostalCode : string |null,
            Email: string | null,
            CustomerName: string | null,
            ServiceProviderName: string | null,
            Status: string | null,
            PaymentStatus: number | null,
            PenaltyStatus: number | null,
            HasIssue: boolean,
            FromDate:string | null,
            ToDate: string | null
        }

export type updateServiceRequestBody= {
            Addressline1: string,
            Addressline2: string,
            City: string,
            Notes: string|null,
            PostalCode : string,
            RescheduleReason: string | null,
            ServiceRequestId: number,
            ServiceStartDate: string,
            ServiceTime: string
        }
