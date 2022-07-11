import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect
} from 'react';

import { Text, ListRenderItem, FlatList, Button, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getSprintResults } from '../../modules/reducers/driver';
import { clearResults } from '../../modules/reducers/driver/reducer';
import { RootState, useTypedDispatch } from '../../store';
import ResultItem from './components/Item/Item';
import styles from './styles';

const keyExtractor = (item) => item.Driver.driverId + item.grid;

const SprintResults = (): JSX.Element => {
  const refList = useRef<FlatList>(null);
  const dispatch = useTypedDispatch();
  const renderDriverItem: ListRenderItem<any> = useCallback(({ item }) => {
    return <ResultItem item={item} />;
  }, []);

  const sprintResults = useSelector((state: RootState) =>
    getSprintResults(state)
  );

  const renderEmpty = useMemo(
    () => <Text style={styles.text}>The list is empty :(</Text>,
    []
  );

  useEffect(() => {
    return () => {
      dispatch(clearResults());
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={refList}
        keyExtractor={keyExtractor}
        data={sprintResults}
        ListEmptyComponent={renderEmpty}
        renderItem={renderDriverItem}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        refreshing={false}
      />
    </View>
  );
};
export default SprintResults;
