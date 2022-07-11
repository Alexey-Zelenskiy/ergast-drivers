export type SprintResult = {
  Constructor: Constructor;
  Driver: Driver;
  FastestLap: { Time: { time: '1:21.020' }; lap: '14' };
  Time: { millis: '1888438'; time: '+48.871' };
  grid: '20';
  laps: '21';
  number: '23';
  points: '0';
  position: '18';
  positionText: '18';
  status: 'Finished';
};

export type ResultsPayload = {
  RaceTable: { Races };
};

type Constructor = {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
};

type Driver = {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
};
