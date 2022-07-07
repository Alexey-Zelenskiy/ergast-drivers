import { axiosApiInstance } from './axios';

const endpointUrlDev = 'http://ergast.com/api/f1/';

export class AppApi {
  static getDriversList(offset: number = 0) {
    const path = `drivers.json`;
    return axiosApiInstance
      .get(endpointUrlDev + path, {
        params: { limit: 10, offset: offset * 10 }
      })
      .then((r) => {
        return r.data.MRData;
      });
  }
}
