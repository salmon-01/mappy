import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface UserProfileProps {
  username: string;
  avatar: string;
  onPress: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, avatar, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.profileSection}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UserProfile;
