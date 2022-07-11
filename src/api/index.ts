import { Driver, DriverPayload } from '../common/types/Driver';
import { ResultsPayload } from '../common/types/SprintResult';
import { axiosApiInstance } from './axios';

const endpointUrlDev = 'http://ergast.com/api/f1/';

export class AppApi {
  static getDriversList(offset: number = 0): Promise<DriverPayload> {
    const path = `drivers.json`;
    return axiosApiInstance
      .get(endpointUrlDev + path, {
        params: { limit: 10, offset: offset * 10 }
      })
      .then((r) => {
        return r.data.MRData;
      });
  }
  static getSprintInfoByDriverId(driverId): Promise<ResultsPayload> {
    const path = `drivers/${driverId}/sprint.json`;
    return axiosApiInstance.get(endpointUrlDev + path).then((r) => {
      return r.data.MRData;
    });
  }
}
