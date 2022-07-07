import { createSlice } from '@reduxjs/toolkit';
import { DispatchType, GetState, RootState } from '../../../store';
import { AppApi } from '../../../api';
import { Driver } from '../../../common/types/Driver';

const initialState = {
  driversList: null as Driver[],
  isLoading: true
};
const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDriversList: (state, action) => {
      state.driversList = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

const { setDriversList, setIsLoading } = driversSlice.actions;
export default driversSlice.reducer;

export const getDriversList =
  (limit?: number, hasLode?: boolean) =>
  async (dispatch: DispatchType, getState: GetState) => {
    try {
      const r = getState().drivers.driversList;
      dispatch(setIsLoading(true));
      const {
        DriverTable: { Drivers }
      } = await AppApi.getDriversList(limit);
      if (hasLode) {
        dispatch(setDriversList([...r, ...Drivers]));
      } else dispatch(setDriversList(Drivers));
      dispatch(setIsLoading(false));
    } catch (e) {
      console.log(e.response);
      console.log(e, 'getDriversList');
    }
  };
