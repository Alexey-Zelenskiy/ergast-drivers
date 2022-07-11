import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Driver } from '../../../../common/types/Driver';

import styles from './styles';

interface Props {
  item: Driver;
  index: number;
  onPress: () => void;
  goToResultsInfo: () => void;
}

const DriverItem: React.FC<Props> = memo(
  ({ item, index, onPress, goToResultsInfo }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{index}: </Text>
        <Text style={styles.text}>
          {item.givenName} {item.familyName}
        </Text>
        <View>
          <TouchableOpacity style={{ flex: 1 }} onPress={goToResultsInfo}>
            <Text style={styles.link}>Show sprint result</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
);

export default DriverItem;
