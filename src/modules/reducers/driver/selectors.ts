import { RootState } from '../../../store';

export const getIsLoading = (state: RootState) => state.drivers.isLoading;
export const getDrivers = (state: RootState) => state.drivers.driversList;
