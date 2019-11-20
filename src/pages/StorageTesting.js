import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { getToken, storeToken, clearToken } from '../utils/storage';

const StorageTesting = () => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');

  const handleGetValue = () => {
    setStatus('Getting value...');
    setValue('');

    getToken()
      .then(token => {
        setStatus('Got value');
        setValue(token);
      })
      .catch(err => {
        setStatus('Error getting value');
        setValue('ERROR');
        console.log(err);
      });
  };

  const handleSetValue = () => {
    setStatus('Setting value...');

    storeToken(value)
      .then(() => {
        setStatus('Set value successful');
      })
      .catch(err => {
        setStatus('Error setting value');
        console.log(err);
      });
  };

  const handleClearValue = () => {
    setStatus('Clearing value...');

    clearToken()
      .then(() => {
        setStatus('Clear value successful');
      })
      .catch(err => {
        setStatus('Error clearing value');
        console.log(err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Auth Token Testing</Text>

      <Button style={styles.button} title="Get Value" onPress={handleGetValue} />
      <Button style={styles.button} title="Set Value" onPress={handleSetValue} />
      <Button style={styles.button} title="Clear Value" onPress={handleClearValue} />

      <Text style={styles.status}>{status}</Text>

      <Text style={styles.label}>Current Value</Text>

      <TextInput style={styles.textInput} value={value} onChangeText={setValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export { StorageTesting };
