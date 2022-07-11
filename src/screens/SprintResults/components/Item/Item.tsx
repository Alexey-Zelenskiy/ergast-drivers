import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { SprintResult } from '../../../../common/types/SprintResult';
import Label from '../../../../components/Label';

import styles from './styles';

interface Props {
  item: SprintResult;
}

const ResultItem: React.FC<Props> = memo(({ item }) => {
  const { number, position, status } = item;
  return (
    <View style={styles.container}>
      <Label text="Number" subText={number} />
      <Label text="Position" subText={position} />
      <Label text="Status" subText={status} />
    </View>
  );
});

export default ResultItem;
