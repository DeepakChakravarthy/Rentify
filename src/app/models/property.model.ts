export interface Property {
    id: string;
    sellerId: string;
    title: string;
    description: string;
    place: string;
    area: number;
    numBedrooms: number;
    numBathrooms: number;
    hospitalsNearby: boolean;
    collegesNearby: boolean;
    amount: number;
    tenantRentalPeriod: number;
    isRentAgreementAvailable: boolean;
    agreementRenewalPeriod: number;
    advanceAmount: number;
    tenantPreference: number;
    isCCTVAvailable: boolean;
    isEBBillDebited: boolean;
    isWaterTaxIncluded: boolean;
    propertyStatus: number;
    parkingAreaAvailable: boolean;
    furnishedStatus: number;
    floorNumber: number;
    totalFloors: number;
    ageOfProperty: number;
    petFriendly: boolean;
    balconyAvailable: boolean;
    stateId: string;
    countryId: string;
    cityId: string;
    address: string;
    pincode: string;
    landmark: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    createdAt: string;
  }
  