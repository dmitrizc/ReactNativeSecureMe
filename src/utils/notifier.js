import { Alert } from 'react-native';

export default {
  success(msg, desc) {
    Alert.alert(msg, desc, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);
  },
  error(msg, desc) {
    Alert.alert(msg, desc, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);
  },
};
