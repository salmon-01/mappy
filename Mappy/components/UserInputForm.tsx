import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface UserInputFormProps {
  username: string;
  setUsername: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
}

const UserInputForm: React.FC<UserInputFormProps> = ({
  username,
  setUsername,
  displayName,
  setDisplayName,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default UserInputForm;
