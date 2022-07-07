import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { DriversStackParamList } from './DriversStack/types';

export type RootStackParamList = {
  DriversStack: NavigatorScreenParams<DriversStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
