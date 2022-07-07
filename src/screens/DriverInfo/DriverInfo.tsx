import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Driver } from '../../common/types/Driver';
import { DriversStackScreenProps } from '../../navigation/DriversStack/types';
import styles from './styles';

const DriverInfo = ({ route }: DriversStackScreenProps<'DriverInfo'>) => {
  const params = useMemo(() => {
    return (
      route.params ||
      ({} as Readonly<{
        driver: Driver;
      }>)
    );
  }, [route.params]);

  const { driver } = params ?? { driver: null };

  return (
    <>
      <WebView
        source={{ uri: driver.url }}
        style={{ flex: 1 }}
        renderLoading={() => {
          return (
            <View style={styles.container}>
              <ActivityIndicator color={'red'} size="large" />
            </View>
          );
        }}
        startInLoadingState={true}
        automaticallyAdjustContentInsets={false}
      />
    </>
  );
};

export default DriverInfo;
