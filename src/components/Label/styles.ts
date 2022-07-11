import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14.25,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black'
  },
  subText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 14,
    color: 'gray'
  }
});
