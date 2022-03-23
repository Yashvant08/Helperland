export type saveServiceRequestDetail = {
    ServiceId:number,
    ServiceStartDate: Date,
    ServiceStartTime:string,
    ZipCode: string,
    Email: string,
    ServiceHours: number,
    Status: number,
    ServiceHourlyRate: number,
    ExtraHours:number,
    SubTotal:number,
    TotalCost:number,
    UserId:number,
    ModifiedBy:number,
    Comments:string,
    HasPets:boolean,
    PaymentDue:boolean,
    ExtraService: [
        {
            ServiceExtraId:number
        }
    ]
}

export type serviceRequestAddress = {
    Addressline1:string,
    Addressline2:string,
    City:string,
    State:string,
    PostalCode:string,
    Mobile:string,
    Email:string,
    ServiceRequestId:number
}