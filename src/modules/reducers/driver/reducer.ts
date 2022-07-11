import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { AppApi } from '../../../api';
import { Driver } from '../../../common/types/Driver';
import { SprintResult } from '../../../common/types/SprintResult';
import { DispatchType, RootState } from '../../../store';

type FetchError = {
  message: string;
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [] as Driver[],
    isLoading: true,
    error: null,
    offset: 1,
    sprintResults: null
  },
  reducers: {
    setOffset: (state, action) => {
      if (action.payload) {
        state.offset = action.payload;
      } else {
        state.offset = state.offset + 1;
      }
    },
    clearSprintResults: (state) => {
      state.sprintResults = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      if (action.meta.arg.refresh) {
        state.drivers = action.payload;
      } else {
        state.drivers = [...state.drivers, ...action.payload];
      }
      state.isLoading = false;
    });

    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchSprintResults.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchSprintResults.fulfilled, (state, action) => {
      state.sprintResults = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchSprintResults.rejected, (state, action) => {
      state.error = action.error.message;
    });
  }
});

const { setOffset, clearSprintResults } = driversSlice.actions;

export const fetchDrivers = createAsyncThunk<
  Driver[],
  { refresh: boolean },
  {
    state: RootState;
    rejectValue?: FetchError;
  }
>(
  'drivers/fetchDrivers',
  async (args = { refresh: false }, { rejectWithValue, getState }) => {
    try {
      const { offset } = getState().drivers;
      const {
        DriverTable: { Drivers }
      } = await AppApi.getDriversList(offset);
      return Drivers as Driver[];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSprintResults = createAsyncThunk<
  [],
  string,
  {
    rejectValue?: FetchError;
  }
>('drivers/fetchSprintResults', async (arg, { rejectWithValue }) => {
  try {
    const {
      RaceTable: { Races }
    } = await AppApi.getSprintInfoByDriverId(arg);
    return Races;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const setOffsetNumber =
  (offset?: number) => (dispatch: DispatchType) => {
    dispatch(setOffset(offset));
  };

export const clearResults = () => (dispatch: DispatchType) => {
  dispatch(clearSprintResults());
};

export default driversSlice.reducer;
