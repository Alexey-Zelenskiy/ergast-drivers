import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DriverInfo from '../../screens/DriverInfo';
import Main from '../../screens/Main';
import SprintResults from '../../screens/SprintResults';
import { DriversStackParamList } from './types';

const DriversStack = createNativeStackNavigator<DriversStackParamList>();

const DriversStackNavigator = () => {
  return (
    <DriversStack.Navigator>
      <DriversStack.Screen
        options={{ title: 'Drivers' }}
        name={'DriversList'}
        component={Main}
      />
      <DriversStack.Screen
        options={{ title: 'Info' }}
        name={'DriverInfo'}
        component={DriverInfo}
      />
      <DriversStack.Screen
        options={{ title: 'Sprint Results' }}
        name={'SprintResult'}
        component={SprintResults}
      />
    </DriversStack.Navigator>
  );
};

export default DriversStackNavigator;
