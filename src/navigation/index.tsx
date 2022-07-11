import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { AsyncStorageKeys } from '../common/asyncStorageKeys';
import DriversStackNavigator from './DriversStack';
import { structuredSelector } from '../modules/reducers/driver';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const { error } = useSelector((state: RootState) =>
    structuredSelector(state)
  );

  const [initialState, setInitialState] = useState<NavigationState | undefined>(
    undefined
  );

  const onStateChange = useCallback((state: NavigationState | undefined) => {
    AsyncStorage.setItem(
      AsyncStorageKeys.StatePersistence,
      JSON.stringify(state)
    );
  }, []);

  useEffect(() => {
    if (!error) {
      (async () => {
        try {
          const savedStateString = await AsyncStorage.getItem(
            AsyncStorageKeys.StatePersistence
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        } finally {
        }
      })();
    }
  }, [error]);

  const screenOption = {
    headerShown: false
  };

  return !error ? (
    <NavigationContainer
      initialState={initialState}
      onStateChange={onStateChange}
    >
      <RootStack.Navigator screenOptions={screenOption}>
        <RootStack.Screen
          name="DriversStack"
          component={DriversStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  ) : (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      entering={FadeIn}
      onLayout={() => RNBootSplash.hide()}
    >
      <Text>{error}</Text>
      <ActivityIndicator size={'large'} />
    </Animated.View>
  );
};

export default RootStackNavigator;
