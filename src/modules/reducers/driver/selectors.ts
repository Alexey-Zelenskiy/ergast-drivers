import { createSelector } from 'reselect';
import { SprintResult } from '../../../common/types/SprintResult';
import { RootState } from '../../../store';

const selectDrivers = (state: RootState) => state.drivers.drivers;
const selectLoading = (state: RootState) => state.drivers.isLoading;
const selectError = (state: RootState) => state.drivers.error;

const selectSprintResult = (state: RootState) => state.drivers.sprintResults;

export const structuredSelector = createSelector(
  selectDrivers,
  selectLoading,
  selectError,
  (drivers, isLoading, error) => ({
    drivers,
    isLoading,
    error
  })
);

export const getSprintResults = createSelector(
  selectSprintResult,
  (results): SprintResult[] => {
    if (!results || !results.length) {
      return null;
    }
    return results.reduce((a, b) => {
      return [...a['SprintResults'], ...b['SprintResults']] || [];
    });
  }
);
