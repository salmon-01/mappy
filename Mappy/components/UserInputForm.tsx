import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { UserInputFormProps } from '~/types';

const UserInputForm: React.FC<UserInputFormProps> = ({
  username,
  setUsername,
  displayName,
  setDisplayName,
}) => {
  return (
    <View>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.text}>Display name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter display name"
        value={displayName}
        onChangeText={setDisplayName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F6F8FA',
    padding: 16,
    borderRadius: 25,
    marginTop: 8,
    marginBottom: 16
  },
  text: {
    color: '#333333',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16
  },
});

export default UserInputForm;
