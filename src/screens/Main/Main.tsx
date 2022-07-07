import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Driver } from '../../common/types/Driver';
import { getDrivers, getIsLoading } from '../../modules/reducers/driver';
import { getDriversList } from '../../modules/reducers/driver/reducer';
import { DriversStackScreenProps } from '../../navigation/DriversStack/types';
import { useTypedDispatch } from '../../store';
import DriverItem from './components/DriverItem/DriverItem';

import styles from './styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Main = ({ navigation }: DriversStackScreenProps<'DriversList'>) => {
  const dispatch = useTypedDispatch();

  const [limit, setLimit] = useState<number>(1);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = useState<boolean>(false);
  const drivers = useSelector(getDrivers);
  const isLoading = useSelector(getIsLoading);

  const refList = useRef<FlatList>(null);
  const renderDriverItem: ListRenderItem<Driver> = useCallback(
    ({ item, index }) => {
      return (
        <DriverItem
          item={item}
          index={index}
          onPress={() => {
            goToDriverInfo(item);
          }}
        />
      );
    },
    []
  );

  const renderFooter = () => <View>{isLoading && <ActivityIndicator />}</View>;

  const renderEmpty = () => (
    <Text style={styles.text}>The list is empty :(</Text>
  );

  const keyExtractor = useCallback((item) => item.driverId, []);

  const fetchMoreData = useCallback(() => {
    if (onEndReachedCalledDuringMomentum) {
      setLimit(limit + 1);
      dispatch(getDriversList(limit, true));
    }
    setOnEndReachedCalledDuringMomentum(false);
  }, [limit, onEndReachedCalledDuringMomentum]);

  const goToDriverInfo = useCallback(
    (driver: Driver) => {
      navigation.navigate('DriverInfo', { driver });
    },
    [navigation]
  );

  const onRefresh = useCallback(() => {
    dispatch(getDriversList());
    setLimit(1);
  }, []);

  useEffect(() => {
    dispatch(getDriversList());
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        exiting={FadeOut.duration(500)}
        entering={FadeIn.duration(500)}
        ref={refList}
        keyExtractor={keyExtractor}
        data={drivers}
        extraData={drivers}
        renderItem={renderDriverItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={onRefresh}
        onEndReached={() => setOnEndReachedCalledDuringMomentum(true)}
        onMomentumScrollEnd={fetchMoreData}
      />
      {isLoading && <ActivityIndicator size={'large'} />}
    </View>
  );
};

export default Main;
