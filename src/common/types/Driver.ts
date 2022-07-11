export type Driver = {
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  url: string;
};

export type DriverPayload = {
  DriverTable: {
    Drivers: Driver[];
  };
};
