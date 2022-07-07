import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Driver } from '../../../../common/types/Driver';

import styles from './styles';

interface Props {
  item: Driver;
  index: number;
  onPress: () => void;
}

const DriverItem = memo(({ item, index, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{index}: </Text>
      <Text style={styles.text}>
        {item.givenName} {item.familyName}
      </Text>
    </TouchableOpacity>
  );
});

export default DriverItem;
