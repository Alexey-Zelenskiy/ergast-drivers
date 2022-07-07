import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { AsyncStorageKeys } from '../common/asyncStorageKeys';
import DriversStackNavigator from './DriversStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const [isReady, setIsReady] = useState(false);
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
    if (!isReady) {
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
          setIsReady(true);
        }
      })();
    }
  }, [isReady]);

  const screenOption = {
    headerShown: false
  };

  return isReady ? (
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
      style={{ ...StyleSheet.absoluteFillObject }}
      entering={isReady ? FadeIn : undefined}
      onLayout={() => RNBootSplash.hide()}
    >
      <ActivityIndicator size={'large'} />
    </Animated.View>
  );
};

export default RootStackNavigator;
