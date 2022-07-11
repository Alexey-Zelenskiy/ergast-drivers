import React from 'react';

import { Text, View, ViewProps } from 'react-native';

import { styles } from './styles';

type Props = {
  text: string;
  subText: string;
} & ViewProps;
const Label = ({ text, subText, ...restProps }: Props) => {
  return (
    <View style={styles.main} {...restProps}>
      <View style={styles.view}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.subText}>{subText}</Text>
    </View>
  );
};
export default Label;
