import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
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
import { structuredSelector } from '../../modules/reducers/driver';
import {
  fetchDrivers,
  fetchSprintResults,
  setOffsetNumber
} from '../../modules/reducers/driver/reducer';
import { DriversStackScreenProps } from '../../navigation/DriversStack/types';
import { RootState, useTypedDispatch } from '../../store';
import DriverItem from './components/DriverItem/DriverItem';

import styles from './styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const keyExtractor = (item: Driver) => item.driverId;

const Main: React.FC<DriversStackScreenProps<'DriversList'>> = ({
  navigation
}) => {
  const dispatch = useTypedDispatch();
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = useState<boolean>(false);

  const { drivers, isLoading } = useSelector((state: RootState) =>
    structuredSelector(state)
  );

  const refList = useRef<FlatList>(null);
  const renderDriverItem: ListRenderItem<Driver> = useCallback(
    ({ item, index }) => {
      const { driverId } = item;
      return (
        <DriverItem
          item={item}
          index={index}
          onPress={() => {
            goToDriverInfo(item);
          }}
          goToResultsInfo={() => {
            goToResultsInfo(driverId);
          }}
        />
      );
    },
    []
  );

  const renderFooter = useMemo(
    () => <View>{isLoading && <ActivityIndicator />}</View>,
    []
  );

  const renderEmpty = useMemo(
    () => <Text style={styles.text}>The list is empty :(</Text>,
    []
  );

  const fetchMoreData = useCallback(() => {
    if (onEndReachedCalledDuringMomentum) {
      dispatch(setOffsetNumber());
      dispatch(fetchDrivers({ refresh: false }));
    }
    setOnEndReachedCalledDuringMomentum(false);
  }, [onEndReachedCalledDuringMomentum, dispatch]);

  const goToDriverInfo = useCallback(
    (driver: Driver) => {
      navigation.navigate('DriverInfo', { driver });
    },
    [navigation]
  );

  const goToResultsInfo = useCallback(
    async (driverId: string) => {
      await dispatch(fetchSprintResults(driverId));
      navigation.navigate('SprintResult');
    },
    [navigation, dispatch]
  );

  const onRefresh = useCallback(() => {
    dispatch(setOffsetNumber(1));
    dispatch(fetchDrivers({ refresh: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDrivers({ refresh: false }));
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        exiting={FadeOut.duration(500)}
        entering={FadeIn.duration(500)}
        ref={refList}
        keyExtractor={keyExtractor}
        data={drivers}
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
