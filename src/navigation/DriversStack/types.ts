import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Driver } from '../../common/types/Driver';

import { RootStackParamList, RootStackScreenProps } from '../types';

export type DriversStackParamList = {
  DriversList: undefined;
  DriverInfo: { driver: Driver };
};

export type DriversStackScreenProps<T extends keyof DriversStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DriversStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
